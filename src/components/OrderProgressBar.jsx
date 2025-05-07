import React from 'react';

const OrderProgressBar = ({ currentStage }) => {
  const stages = [
    { id: 'pending', label: 'Pending Quote' },
    { id: 'approved', label: 'Quote Approved' },
    { id: 'payment', label: 'Payment Received' },
    { id: 'production', label: 'In Production' },
    { id: 'delivered', label: 'Delivered' }
  ];

  const getStageIndex = (stageId) => {
    return stages.findIndex(stage => stage.id === stageId);
  };

  const currentStageIndex = getStageIndex(currentStage);

  return (
    <div className="w-full py-8">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-[20px] right-[20px] z-0">
          <div className="h-0.5 w-full bg-gray-200">
            <div 
              className="h-full bg-purple-600 transition-all duration-500 ease-in-out"
              style={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Stage Circles and Labels */}
        <div className="grid grid-cols-5 relative z-10">
          {stages.map((stage, index) => {
            const isCompleted = index <= currentStageIndex;
            const isCurrent = index === currentStageIndex;

            return (
              <div key={stage.id} className="flex flex-col items-center">
                {/* Circle Container */}
                <div className="relative w-10 h-10">
                  <div 
                    className={`absolute inset-0 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-purple-600' 
                        : isCurrent 
                          ? 'bg-purple-100 border-2 border-purple-600' 
                          : 'bg-gray-100'
                    }`}
                  >
                    {isCompleted ? (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Label */}
                <span 
                  className={`mt-2 text-sm font-medium transition-colors duration-300 text-center ${
                    isCompleted || isCurrent ? 'text-purple-600' : 'text-gray-500'
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderProgressBar; 