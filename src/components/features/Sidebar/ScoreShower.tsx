import React from 'react'

interface ScoreShowerProps {
    score: number
}

const ScoreShower: React.FC<ScoreShowerProps> = ({score}) => {
  return (
    <>
        <div className="flex items-center justify-center mt-20">
            <div className="relative">
                <div className="border-8 border-blue-500 rounded-full w-96 h-96 flex items-center justify-center">
                    <div className="text-7xl font-semibold">
                        {score}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ScoreShower