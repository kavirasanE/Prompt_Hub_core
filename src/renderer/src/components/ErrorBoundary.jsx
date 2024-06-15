import { Button, Modal } from 'flowbite-react'
import { useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { Navigate } from 'react-router-dom'

const ErrorBoundaries = () => {
  const [openModal, setOpenModal] = useState(true)

  const [redirect, setRedirect] = useState(false)

  const handlerefresh = () => {
    setOpenModal(false)
    setRedirect(true)
  }

  if (redirect) {
    return <Navigate to="/" />
  }

  return (
    <>
      {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
             🎉 WOW! You found a bug in my application – great job, bug detective!
              🐞🔍 Please report it to me for a quick workaround. We'll have it fixed in the next
              version. Ping me on Chime at <span className='font-semibold text-xl text-blue-700 underline '> kavirasa</span> or email me at
              <span className='font-semibold text-xl text-blue-700 underline '> kavirasa@amazon.com</span>. You can also give feedback on my share your thoughts page. If you
              want to continue with the application, just click the refresh button and keep on
              rockin'! 🎸 Thank you for your patience and sorry for the inconvenience. Have a
              fantastic day! 🌟
            </h3>
            <div className="flex justify-center gap-4">
              <Button className="bg-purple-800" onClick={handlerefresh}>
                Please Refresh your Page
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default ErrorBoundaries
