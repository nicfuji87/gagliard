import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-full">
              <img 
                alt="Logotipo P&B" 
                className="h-10 w-10 object-contain" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJK-D5asoBRshyuFi7-ZaquRoL1z_LhOYVLZ_FzidmXfc3e-6-CgsAsp4R9zpbdbDwecDAZaFXw0zk8SJd0zEJfGjRSkBhmzMerhDR7zJ_1Q6nDdpFXIKMpTd7a-ENeIkN9XC9rES-KMCHV7IhzUnuIKP8PKKOW_6dOm8iTOlIgzzvIzvgpse07twuW7WqvgLGefhYJiAeoFiCoHqLUV0wMxLpUqD5RI1DiVFMUhDwGpOkYzmFU_Y6BYVwYCAQxB7toqM_BUTPp9g"
                onError={(e) => {
                  e.currentTarget.src = 'https://picsum.photos/50/50?grayscale';
                }}
              />
            </div>
            <span className="font-display font-bold text-xl tracking-wide uppercase">Judô Gagliard</span>
          </div>

          <div className="text-gray-400 text-sm text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} Judô Gagliard. Todos os direitos reservados.</p>
            <p className="mt-1">Design inspirado na tradição.</p>
          </div>

        </div>
      </div>
    </footer>
  );
};