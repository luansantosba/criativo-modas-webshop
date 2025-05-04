
import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { CartItem, Address, ShippingMethod, PaymentMethod } from "@/lib/types";
import { calculateShipping, getAddressFromZipCode } from "@/lib/products";
import { Minus, Plus, ShoppingCart, X, CreditCard } from "lucide-react";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemIndex: number, quantity: number) => void;
  onRemoveItem: (itemIndex: number) => void;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  // Cart States
  const [step, setStep] = useState<"cart" | "shipping" | "payment" | "confirmation">("cart");
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("PAC");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("PIX");

  // Address States
  const [address, setAddress] = useState<Address>({
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
  });

  // Toast notification
  const { toast } = useToast();

  // Reset step when cart modal is closed
  useEffect(() => {
    if (!isOpen) {
      setStep("cart");
    }
  }, [isOpen]);

  // Handle ZIP code lookup
  const handleZipCodeLookup = async () => {
    if (address.zipCode.length === 8 || address.zipCode.length === 9) {
      const zipCode = address.zipCode.replace(/\D/g, "");
      const addressData = await getAddressFromZipCode(zipCode);

      if (addressData) {
        setAddress((prev) => ({
          ...prev,
          street: addressData.street || prev.street,
          neighborhood: addressData.neighborhood || prev.neighborhood,
          city: addressData.city || prev.city,
          state: addressData.state || prev.state,
        }));
        
        toast({
          title: "Endereço encontrado",
          description: "Os dados do endereço foram preenchidos automaticamente",
        });
      } else {
        toast({
          title: "CEP não encontrado",
          description: "Verifique o CEP informado",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "CEP inválido",
        description: "Digite um CEP válido com 8 dígitos",
        variant: "destructive",
      });
    }
  };

  // Calculate cart subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Calculate shipping cost
  const shippingCost = cartItems.length > 0 
    ? calculateShipping(address.zipCode, shippingMethod)
    : 0;

  // Calculate total
  const total = subtotal + shippingCost;

  // Format currency
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Generate order number
  const generateOrderNumber = () => {
    return `CM${Date.now().toString().slice(-6)}`;
  };

  // Handle checkout
  const handleCheckout = () => {
    // For demonstration, we'll just show a success message
    toast({
      title: "Pedido confirmado!",
      description: `Seu pedido #${generateOrderNumber()} foi confirmado com sucesso.`,
    });
    
    // Clear cart and close modal (the parent component should handle clearing the cart)
    onClose();
  };

  // Handle "Continue Shopping" button
  const handleContinueShopping = () => {
    onClose();
  };

  // Check if form is valid
  const isShippingFormValid = () => {
    return (
      address.street.trim() !== "" &&
      address.number.trim() !== "" &&
      address.neighborhood.trim() !== "" &&
      address.city.trim() !== "" &&
      address.state.trim() !== "" &&
      address.zipCode.trim().length >= 8
    );
  };

  // Determine if we should proceed to the next step
  const canProceedToShipping = cartItems.length > 0;
  const canProceedToPayment = isShippingFormValid();

  // Render step content
  const renderStepContent = () => {
    switch (step) {
      case "cart":
        return (
          <>
            <SheetHeader className="mb-4">
              <SheetTitle>Carrinho de Compras</SheetTitle>
            </SheetHeader>

            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[50vh]">
                <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">Seu carrinho está vazio</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Adicione alguns produtos para continuar
                </p>
                <Button onClick={handleContinueShopping}>
                  Continuar Comprando
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto pr-2">
                  {cartItems.map((item, index) => (
                    <div key={`${item.product.id}-${index}`} className="flex py-4 border-b">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                        <img
                          src={item.product.variants.find(
                            (v) => v.color.name === item.selectedColor.name
                          )?.imageUrl}
                          alt={item.product.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div className="flex justify-between text-base font-medium">
                          <h3 className="line-clamp-1">{item.product.name}</h3>
                          <p className="ml-4">
                            {formatCurrency(item.product.price * item.quantity)}
                          </p>
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          <p>Cor: {item.selectedColor.name}</p>
                          <p>Tamanho: {item.selectedSize}</p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border rounded-md">
                            <button
                              onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                              className="p-1"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-2">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                              className="p-1"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => onRemoveItem(index)}
                            className="text-sm text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-base font-medium mb-1">
                    <p>Subtotal</p>
                    <p>{formatCurrency(subtotal)}</p>
                  </div>
                </div>

                <SheetFooter className="mt-6 pb-6 px-4 sm:px-0">
                  <Button 
                    onClick={() => setStep("shipping")}
                    disabled={!canProceedToShipping}
                    className="w-full"
                  >
                    Continuar para entrega
                  </Button>
                </SheetFooter>
              </>
            )}
          </>
        );

      case "shipping":
        return (
          <>
            <SheetHeader className="mb-4">
              <SheetTitle>Informações de Entrega</SheetTitle>
            </SheetHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="zipCode" className="text-right">
                  CEP
                </Label>
                <div className="col-span-3 flex gap-2">
                  <Input
                    id="zipCode"
                    className="flex-1"
                    placeholder="12345678"
                    value={address.zipCode}
                    onChange={(e) =>
                      setAddress({ ...address, zipCode: e.target.value })
                    }
                  />
                  <Button onClick={handleZipCodeLookup} variant="outline" size="sm">
                    Buscar
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="street" className="text-right">
                  Rua
                </Label>
                <Input
                  id="street"
                  className="col-span-3"
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className="text-right">
                  Número
                </Label>
                <Input
                  id="number"
                  className="col-span-3"
                  value={address.number}
                  onChange={(e) =>
                    setAddress({ ...address, number: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="neighborhood" className="text-right">
                  Bairro
                </Label>
                <Input
                  id="neighborhood"
                  className="col-span-3"
                  value={address.neighborhood}
                  onChange={(e) =>
                    setAddress({ ...address, neighborhood: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="city" className="text-right">
                  Cidade
                </Label>
                <Input
                  id="city"
                  className="col-span-3"
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="state" className="text-right">
                  Estado
                </Label>
                <Select
                  value={address.state}
                  onValueChange={(value) =>
                    setAddress({ ...address, state: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AC">Acre</SelectItem>
                    <SelectItem value="AL">Alagoas</SelectItem>
                    <SelectItem value="AP">Amapá</SelectItem>
                    <SelectItem value="AM">Amazonas</SelectItem>
                    <SelectItem value="BA">Bahia</SelectItem>
                    <SelectItem value="CE">Ceará</SelectItem>
                    <SelectItem value="DF">Distrito Federal</SelectItem>
                    <SelectItem value="ES">Espírito Santo</SelectItem>
                    <SelectItem value="GO">Goiás</SelectItem>
                    <SelectItem value="MA">Maranhão</SelectItem>
                    <SelectItem value="MT">Mato Grosso</SelectItem>
                    <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                    <SelectItem value="MG">Minas Gerais</SelectItem>
                    <SelectItem value="PA">Pará</SelectItem>
                    <SelectItem value="PB">Paraíba</SelectItem>
                    <SelectItem value="PR">Paraná</SelectItem>
                    <SelectItem value="PE">Pernambuco</SelectItem>
                    <SelectItem value="PI">Piauí</SelectItem>
                    <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                    <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                    <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                    <SelectItem value="RO">Rondônia</SelectItem>
                    <SelectItem value="RR">Roraima</SelectItem>
                    <SelectItem value="SC">Santa Catarina</SelectItem>
                    <SelectItem value="SP">São Paulo</SelectItem>
                    <SelectItem value="SE">Sergipe</SelectItem>
                    <SelectItem value="TO">Tocantins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4 mt-4">
              <Label>Método de Envio</Label>
              <RadioGroup
                value={shippingMethod}
                onValueChange={(value: ShippingMethod) => setShippingMethod(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="PAC" id="pac" />
                  <Label htmlFor="pac">PAC - {formatCurrency(15)}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="SEDEX" id="sedex" />
                  <Label htmlFor="sedex">SEDEX - {formatCurrency(22.5)}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="EXPRESS" id="express" />
                  <Label htmlFor="express">Express - {formatCurrency(30)}</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mt-6 space-y-4">
              <Separator />
              <div className="flex justify-between text-base font-medium">
                <p>Subtotal</p>
                <p>{formatCurrency(subtotal)}</p>
              </div>
              <div className="flex justify-between">
                <p>Frete</p>
                <p>{formatCurrency(shippingCost)}</p>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <p>Total</p>
                <p>{formatCurrency(total)}</p>
              </div>
            </div>

            <SheetFooter className="mt-6 space-y-2 pb-6 px-4 sm:px-0">
              <Button
                onClick={() => setStep("payment")}
                disabled={!canProceedToPayment}
                className="w-full mb-2"
              >
                Continuar para pagamento
              </Button>
              <Button
                variant="outline"
                onClick={() => setStep("cart")}
                className="w-full"
              >
                Voltar
              </Button>
            </SheetFooter>
          </>
        );

      case "payment":
        return (
          <>
            <SheetHeader className="mb-4">
              <SheetTitle>Método de Pagamento</SheetTitle>
            </SheetHeader>

            <div className="space-y-6 overflow-y-auto pb-2">
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value: PaymentMethod) => setPaymentMethod(value)}
                className="space-y-4"
              >
                <div className="border rounded-lg p-4 cursor-pointer hover:bg-secondary transition-colors">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="PIX" id="pix" />
                    <Label htmlFor="pix" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">PIX</p>
                          <p className="text-sm text-muted-foreground">
                            Pagamento instantâneo
                          </p>
                        </div>
                        <div className="h-8 w-8 bg-[#32BCAD] text-white rounded-md flex items-center justify-center">
                          PIX
                        </div>
                      </div>
                    </Label>
                  </div>
                </div>

                <div className="border rounded-lg p-4 cursor-pointer hover:bg-secondary transition-colors">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="CREDIT_CARD" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Cartão de Crédito</p>
                          <p className="text-sm text-muted-foreground">
                            Visa, MasterCard, Elo e outros
                          </p>
                        </div>
                        <div className="flex space-x-1">
                          <div className="h-8 w-12 bg-[#1434CB] rounded-md flex items-center justify-center text-white text-xs">
                            VISA
                          </div>
                          <div className="h-8 w-12 bg-[#EB001B] rounded-md flex items-center justify-center text-white text-xs">
                            MC
                          </div>
                        </div>
                      </div>
                    </Label>
                  </div>

                  {paymentMethod === "CREDIT_CARD" && (
                    <div className="mt-4 space-y-3">
                      <div>
                        <Label htmlFor="card-number">Número do Cartão</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="expiry">Validade</Label>
                          <Input id="expiry" placeholder="MM/AA" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="name">Nome no Cartão</Label>
                        <Input id="name" placeholder="NOME COMPLETO" />
                      </div>
                      <div>
                        <Label htmlFor="installments">Parcelas</Label>
                        <Select defaultValue="1">
                          <SelectTrigger id="installments">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">
                              1x de {formatCurrency(total)} (sem juros)
                            </SelectItem>
                            <SelectItem value="2">
                              2x de {formatCurrency(total / 2)} (sem juros)
                            </SelectItem>
                            <SelectItem value="3">
                              3x de {formatCurrency(total / 3)} (sem juros)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              </RadioGroup>

              <div className="space-y-4">
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <p>Total</p>
                  <p>{formatCurrency(total)}</p>
                </div>
              </div>
            </div>

            <SheetFooter className="mt-4 space-y-2 pb-6 px-4 sm:px-0">
              <Button onClick={handleCheckout} className="w-full mb-2">
                Finalizar Compra
              </Button>
              <Button
                variant="outline"
                onClick={() => setStep("shipping")}
                className="w-full"
              >
                Voltar
              </Button>
            </SheetFooter>
          </>
        );

      case "confirmation":
        // This should never render since we handle the confirmation through a toast message
        return null;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col overflow-y-auto">
        {renderStepContent()}
      </SheetContent>
    </Sheet>
  );
};

export default CartModal;
