import React from 'react'

function CommentSection() {
  return (
    <div>
      <div className="mt-12">
              <h3 className="text-lg font-semibold text-gray-800">All Comments (3)</h3>
              <div className="space-y-6 mt-6">
                {/* Comment 1 */}
                <div className="bg-gray-100 shadow-md border p-6 rounded-lg">
                  <div className="flex items-start">
                    <img 
                      src="/img3.png" 
                      alt="Profile Picture" 
                      width={40} 
                      height={40} 
                      className="rounded-full" 
                    />
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-sm font-bold text-gray-800">Anomali windah</h4>
                          <p className="text-xs text-gray-500">15 December 2020, 11:40 AM</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-gray-600 hover:text-blue-800 text-sm">Reply</button>
                          <button className="text-gray-600 hover:text-blue-800 text-sm">Edit</button>
                          <button className="text-gray-600 hover:text-blue-800 text-sm">Delete</button>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi.
                      </p>
                      {/* Reply to Comment */}
                      <div className="mt-6 ml-10">
                        <div className="flex items-start">
                          <img 
                            src="/img3.png" 
                            alt="Profile Picture" 
                            width={30} 
                            height={30} 
                            className="rounded-full" 
                          />
                          <div className="ml-4">
                            <h4 className="text-sm font-bold text-gray-800">Paul M. Williams</h4>
                            <p className="text-xs text-gray-500">15 December 2020, 11:40 AM</p>
                            <p className="text-gray-600 mt-2">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris
                            </p>
                            <button className="text-gray-600 hover:text-blue-800 text-sm mt-2">Reply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                </div>
    </div>
  )
}

export default CommentSection
