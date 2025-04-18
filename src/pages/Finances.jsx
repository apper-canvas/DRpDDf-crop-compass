import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  TrendingDown,
  ArrowRight,
  ArrowLeft,
  Download,
  Plus,
  Calendar,
  FileText,
  Filter,
  ChevronDown
} from 'lucide-react';
import Chart from 'react-apexcharts';
import { format } from 'date-fns';

// Mock data for demonstration
const mockTransactions = [
  { id: 1, description: "Fertilizer Purchase", amount: -2500, date: "2023-09-10", category: "Supplies", account: "Farm Operations" },
  { id: 2, description: "Corn Harvest Sale", amount: 12500, date: "2023-09-08", category: "Sales", account: "Farm Income" },
  { id: 3, description: "Equipment Repair", amount: -800, date: "2023-09-03", category: "Maintenance", account: "Farm Operations" },
  { id: 4, description: "Grain Storage Fee", amount: -350, date: "2023-09-01", category: "Services", account: "Farm Operations" },
  { id: 5, description: "Diesel Fuel", amount: -1200, date: "2023-08-28", category: "Supplies", account: "Farm Operations" },
  { id: 6, description: "Wheat Sale", amount: 8500, date: "2023-08-25", category: "Sales", account: "Farm Income" },
  { id: 7, description: "Property Tax", amount: -3200, date: "2023-08-20", category: "Taxes", account: "Farm Operations" },
  { id: 8, description: "Insurance Premium", amount: -1800, date: "2023-08-15", category: "Insurance", account: "Farm Operations" },
];

const mockAccounts = [
  { id: 1, name: "Farm Operations", balance: 24500, type: "Checking" },
  { id: 2, name: "Farm Income", balance: 48200, type: "Savings" },
  { id: 3, name: "Equipment Fund", balance: 15800, type: "Savings" },
  { id: 4, name: "Emergency Fund", balance: 10000, type: "Savings" },
];

const mockMonthlyData = {
  income: [12500, 18200, 15800, 21000, 16500, 22000, 24500, 21000, 16500, 22000, 24500, 26000],
  expenses: [8200, 9500, 10200, 11500, 9800, 12000, 13500, 11500, 9800, 12000, 13500, 14000],
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};

function Finances() {
  const [dateRange, setDateRange] = useState('thisMonth');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [accountFilter, setAccountFilter] = useState('all');
  const [timeframe, setTimeframe] = useState('monthly');
  const [chartData, setChartData] = useState(null);
  
  // Calculate summary data
  const totalIncome = mockTransactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = mockTransactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
  const netIncome = totalIncome - totalExpenses;
  
  const totalBalance = mockAccounts.reduce((sum, account) => sum + account.balance, 0);
  
  // Filter transactions
  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesCategory = categoryFilter === 'all' || transaction.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesAccount = accountFilter === 'all' || transaction.account === accountFilter;
    return matchesCategory && matchesAccount;
  });
  
  // Initialize chart
  useEffect(() => {
    const options = {
      chart: {
        type: 'bar',
        toolbar: {
          show: false
        },
        fontFamily: 'Inter, sans-serif',
      },
      colors: ['#10B981', '#EF4444'],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 4
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: timeframe === 'monthly' ? mockMonthlyData.months : ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        axisBorder: {
          show: false
        },
        labels: {
          style: {
            colors: '#94A3B8'
          }
        }
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return '$' + value.toLocaleString();
          },
          style: {
            colors: '#94A3B8'
          }
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (value) {
            return '$' + value.toLocaleString();
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        labels: {
          colors: '#94A3B8'
        }
      },
      grid: {
        borderColor: '#E2E8F0',
        strokeDashArray: 4,
      },
      theme: {
        mode: 'light'
      }
    };
    
    const series = [{
      name: 'Income',
      data: timeframe === 'monthly' ? mockMonthlyData.income : [4500, 5200, 3800, 8500]
    }, {
      name: 'Expenses',
      data: timeframe === 'monthly' ? mockMonthlyData.expenses : [3200, 2800, 3500, 2500]
    }];
    
    setChartData({ options, series });
  }, [timeframe]);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header Section */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-surface-100 mb-2">
          Financial Management
        </h1>
        <p className="text-surface-600 dark:text-surface-400">
          Track income, expenses, and manage your farm finances
        </p>
      </motion.div>
      
      {/* Summary Cards */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="card p-4">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
              <DollarSign size={20} className="text-blue-500" />
            </div>
            <div>
              <p className="text-surface-600 dark:text-surface-400 text-sm">Total Balance</p>
              <h3 className="text-xl font-bold">${totalBalance.toLocaleString()}</h3>
              <p className="text-surface-500 dark:text-surface-400 text-xs mt-1">Across all accounts</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
              <TrendingUp size={20} className="text-green-500" />
            </div>
            <div>
              <p className="text-surface-600 dark:text-surface-400 text-sm">Total Income</p>
              <h3 className="text-xl font-bold text-green-600 dark:text-green-400">${totalIncome.toLocaleString()}</h3>
              <p className="text-surface-500 dark:text-surface-400 text-xs mt-1">Last 30 days</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3">
              <TrendingDown size={20} className="text-red-500" />
            </div>
            <div>
              <p className="text-surface-600 dark:text-surface-400 text-sm">Total Expenses</p>
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400">${totalExpenses.toLocaleString()}</h3>
              <p className="text-surface-500 dark:text-surface-400 text-xs mt-1">Last 30 days</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
              <CreditCard size={20} className="text-purple-500" />
            </div>
            <div>
              <p className="text-surface-600 dark:text-surface-400 text-sm">Net Income</p>
              <h3 className={`text-xl font-bold ${netIncome >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                ${netIncome.toLocaleString()}
              </h3>
              <p className="text-surface-500 dark:text-surface-400 text-xs mt-1">Profit/Loss</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Chart Section */}
      <motion.div 
        className="card mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h3 className="font-semibold text-lg mb-2 sm:mb-0">Income & Expenses</h3>
          
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setTimeframe('monthly')} 
              className={`px-3 py-1 text-sm rounded-full ${
                timeframe === 'monthly' 
                  ? 'bg-primary/10 text-primary border border-primary/30' 
                  : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 border border-transparent'
              }`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setTimeframe('weekly')} 
              className={`px-3 py-1 text-sm rounded-full ${
                timeframe === 'weekly' 
                  ? 'bg-primary/10 text-primary border border-primary/30' 
                  : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 border border-transparent'
              }`}
            >
              Weekly
            </button>
            <button className="btn btn-sm btn-outline ml-2">
              <Download size={14} className="mr-1" />
              Export
            </button>
          </div>
        </div>
        <div className="p-4">
          {chartData && (
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="bar"
              height={350}
            />
          )}
        </div>
      </motion.div>
      
      {/* Accounts List */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="lg:col-span-1">
          <div className="card h-full">
            <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg">Accounts</h3>
              <button className="btn btn-sm btn-outline">
                <Plus size={14} className="mr-1" />
                Add
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {mockAccounts.map(account => (
                  <div key={account.id} className="p-3 bg-surface-50 dark:bg-surface-700/50 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium">{account.name}</h4>
                      <span className="text-xs bg-surface-200 dark:bg-surface-600 px-2 py-0.5 rounded-full">
                        {account.type}
                      </span>
                    </div>
                    <p className="text-xl font-semibold">${account.balance.toLocaleString()}</p>
                    <div className="flex justify-end mt-2">
                      <button className="text-xs text-primary dark:text-primary-light hover:underline flex items-center">
                        View Details <ArrowRight size={12} className="ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Transactions */}
        <div className="lg:col-span-2">
          <div className="card h-full">
            <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg">Recent Transactions</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="appearance-none text-sm px-3 py-1 pr-8 rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="thisMonth">This Month</option>
                    <option value="lastMonth">Last Month</option>
                    <option value="last3Months">Last 3 Months</option>
                    <option value="thisYear">This Year</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-surface-500">
                    <ChevronDown size={14} />
                  </div>
                </div>
                <button className="btn btn-sm btn-outline">
                  <Plus size={14} className="mr-1" />
                  New
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-2 mb-4">
                <button 
                  onClick={() => setCategoryFilter('all')} 
                  className={`px-3 py-1 text-xs rounded-full ${
                    categoryFilter === 'all' 
                      ? 'bg-primary/10 text-primary border border-primary/30' 
                      : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 border border-transparent'
                  }`}
                >
                  All
                </button>
                <button 
                  onClick={() => setCategoryFilter('sales')} 
                  className={`px-3 py-1 text-xs rounded-full ${
                    categoryFilter === 'sales' 
                      ? 'bg-primary/10 text-primary border border-primary/30' 
                      : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 border border-transparent'
                  }`}
                >
                  Sales
                </button>
                <button 
                  onClick={() => setCategoryFilter('supplies')} 
                  className={`px-3 py-1 text-xs rounded-full ${
                    categoryFilter === 'supplies' 
                      ? 'bg-primary/10 text-primary border border-primary/30' 
                      : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 border border-transparent'
                  }`}
                >
                  Supplies
                </button>
                <button 
                  onClick={() => setCategoryFilter('services')} 
                  className={`px-3 py-1 text-xs rounded-full ${
                    categoryFilter === 'services' 
                      ? 'bg-primary/10 text-primary border border-primary/30' 
                      : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 border border-transparent'
                  }`}
                >
                  Services
                </button>
                <button 
                  onClick={() => setCategoryFilter('maintenance')}
                  className={`px-3 py-1 text-xs rounded-full ${
                    categoryFilter === 'maintenance' 
                      ? 'bg-primary/10 text-primary border border-primary/30' 
                      : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 border border-transparent'
                  }`}
                >
                  Maintenance
                </button>
              </div>
              
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map(transaction => (
                    <div key={transaction.id} className="flex items-center p-3 bg-surface-50 dark:bg-surface-700/50 rounded-lg">
                      <div className={`w-10 h-10 rounded-full ${
                        transaction.amount > 0 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-500' 
                          : 'bg-red-100 dark:bg-red-900/30 text-red-500'
                      } flex items-center justify-center mr-3`}>
                        {transaction.amount > 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium">{transaction.description}</p>
                        <div className="flex items-center text-surface-500 dark:text-surface-400 text-xs">
                          <Calendar size={12} className="mr-1" />
                          <span>{format(new Date(transaction.date), 'MMM d, yyyy')}</span>
                          <span className="mx-2">•</span>
                          <FileText size={12} className="mr-1" />
                          <span>{transaction.category}</span>
                        </div>
                      </div>
                      <div className={`text-right ${
                        transaction.amount > 0 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        <p className="font-semibold">
                          {transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount).toLocaleString()}
                        </p>
                        <p className="text-xs text-surface-500 dark:text-surface-400">{transaction.account}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-surface-500 dark:text-surface-400">
                    No transactions found matching your criteria.
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <button className="btn btn-sm btn-outline flex items-center">
                  <ArrowLeft size={14} className="mr-1" />
                  Previous
                </button>
                <span className="text-sm text-surface-600 dark:text-surface-400">Page 1 of 3</span>
                <button className="btn btn-sm btn-outline flex items-center">
                  Next
                  <ArrowRight size={14} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Finances;