export default function ChatLoading() {
  return (
    <div className="containerLayout">
      <h1 className="text-4xl font-semibold mb-10">
        Negociação
      </h1>
      <div className="w-full h-4/5 bg-white shadow-md rounded-3xl
                      flex flex-col">
          <div className="w-2/5 shadow-md m-7 max-h-fit rounded-xl p-5">
              <p className="text-lg font-semibold">
                Reco Bot
              </p>
              <div className="bg-gray-200 h-10 transition-transform 
                            ease-in-out duration-300 animate-pulse
                            rounded-full">
              </div>
              <div className="flex w-2/3 gap-2 mt-2">
                <div className="bg-gray-200 h-10 transition-transform 
                                ease-in-out duration-300 animate-pulse
                                rounded-md flex-1">
                </div>
                <div className="bg-gray-200 h-10 transition-transform 
                                ease-in-out duration-300 animate-pulse
                                rounded-md flex-1">
                </div>
              </div>
          </div>
          <div className="w-2/5 shadow-md m-7 max-h-fit rounded-xl
                          p-5 ml-auto bg-tertiary">
              <p className="text-lg font-semibold">
                Você
              </p>
              <div className="bg-gray-700 h-10 transition-transform 
                            ease-in-out duration-300 animate-pulse
                            rounded-full">
              </div>
          </div>
      </div>
    </div>
  )
}