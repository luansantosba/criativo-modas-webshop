
import React from "react";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Criativo Modas</h3>
            <p className="text-gray-300">
              A melhor loja de roupas com preços incríveis e produtos de qualidade.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Horário de Funcionamento</h3>
            <p className="text-gray-300">Segunda a Sexta: 9h às 18h</p>
            <p className="text-gray-300">Sábados: 9h às 13h</p>
            <p className="text-gray-300">Domingos e Feriados: Fechado</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Endereço</h3>
            <p className="text-gray-300">Rua das Flores, 123</p>
            <p className="text-gray-300">Centro, Cidade - Estado</p>
            <p className="text-gray-300">CEP: 12345-678</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Criativo Modas. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-white hover:text-gray-400 transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-white hover:text-gray-400 transition-colors">
              <MessageCircle size={24} />
            </a>
            <a href="#" className="text-white hover:text-gray-400 transition-colors">
              <Facebook size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
