
import React from "react";
import { Instagram, Facebook, WhatsApp } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-criativo-primary text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Store Information */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">Criativo Modas</h3>
            <p className="text-gray-300">
              Moda para todos os gostos e estilos.
            </p>
          </div>

          {/* Store Hours */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Horário de Funcionamento</h3>
            <p className="text-gray-300">Segunda - Sexta: 09:00 - 18:00</p>
            <p className="text-gray-300">Sábado: 09:00 - 13:00</p>
            <p className="text-gray-300">Domingo: Fechado</p>
          </div>

          {/* Social Media & Contact */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold mb-4">Redes Sociais</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="#" className="hover:text-gray-300 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <WhatsApp size={24} />
              </a>
            </div>
            <div className="mt-4 text-gray-300">
              <p>Rua das Flores, 123</p>
              <p>São Paulo, SP</p>
              <p>contato@criativomodas.com.br</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Criativo Modas. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
