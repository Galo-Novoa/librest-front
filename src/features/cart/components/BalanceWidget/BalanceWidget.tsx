import { useState } from 'react';
import { Plus, Wallet } from 'lucide-react';
import { useBalanceStore } from '../../../../app/store/balanceStore';
import { useToast } from '../../../../shared/lib/useToast';

export const BalanceWidget = () => {
  const { balance, deposit } = useBalanceStore();
  const { showToast } = useToast();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR').format(price);
  };

  const handleDeposit = () => {
    const amount = Number.parseFloat(depositAmount);
    
    if (Number.isNaN(amount) || amount <= 0) {
      showToast('Ingresa un monto válido', 'error');
      return;
    }

    if (amount > 1000000) {
      showToast('El monto máximo por recarga es de $1,000,000', 'error');
      return;
    }

    deposit(amount);
    showToast(`Recarga exitosa: $${formatPrice(amount)}`, 'success');
    setDepositAmount('');
    setShowDepositModal(false);
  };

  const quickAmounts = [1000, 5000, 10000, 20000];

  return (
    <>
      <div className="flex items-center gap-3 bg-lime-500 text-white px-4 py-2 rounded-lg">
        <Wallet size={20} />
        <span className="font-semibold">${formatPrice(balance)}</span>
        <button
          onClick={() => setShowDepositModal(true)}
          className="bg-lime-600 hover:bg-lime-700 text-white p-1 rounded transition-colors"
          title="Recargar saldo"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Modal de recarga */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 max-w-[90vw]">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recargar Saldo</h3>
            
            <div className="space-y-4">
              {/* Montos rápidos */}
              <div>
                <label htmlFor="quickAmounts" className="block text-sm font-medium text-gray-700 mb-2">
                  Montos rápidos:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setDepositAmount(amount.toString())}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded-lg transition-colors text-sm font-medium"
                    >
                      ${formatPrice(amount)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input personalizado */}
              <div>
                <label htmlFor="depositAmount" className="block text-sm font-medium text-gray-700 mb-2">
                  O ingresa un monto personalizado:
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="depositAmount"
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                    min="0"
                    max="1000000"
                    step="100"
                  />
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowDepositModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeposit}
                  disabled={!depositAmount || Number.parseFloat(depositAmount) <= 0}
                  className="flex-1 bg-lime-500 text-white py-3 rounded-lg hover:bg-lime-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Recargar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};