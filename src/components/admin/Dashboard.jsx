import { 
  CubeIcon, 
  FolderIcon, 
  CurrencyDollarIcon, 
  PhotoIcon 
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Total Products',
    value: '120',
    icon: CubeIcon,
    change: '+12%',
    changeType: 'positive'
  },
  {
    name: 'Categories',
    value: '15',
    icon: FolderIcon,
    change: '+2',
    changeType: 'positive'
  },
  {
    name: 'Revenue (MTD)',
    value: '$12,450',
    icon: CurrencyDollarIcon,
    change: '+18.5%',
    changeType: 'positive'
  },
  {
    name: 'Media Assets',
    value: '450',
    icon: PhotoIcon,
    change: '+45',
    changeType: 'positive'
  }
];

const Dashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className="p-2 bg-purple-50 rounded-lg">
                <stat.icon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className={`ml-2 text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for charts and other dashboard content */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-xl shadow-sm p-6 min-h-[400px]">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h3>
          <div className="flex items-center justify-center h-[300px] text-gray-400">
            Chart placeholder
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 min-h-[400px]">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Products</h3>
          <div className="flex items-center justify-center h-[300px] text-gray-400">
            Chart placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 