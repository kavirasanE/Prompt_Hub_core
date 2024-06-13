import React from 'react'
import { Online } from '../components/Sidebar'
import { FaBookOpen } from 'react-icons/fa'
import { HiArrowRight, HiX } from 'react-icons/hi'
import Footer from '../components/Footer'
import slack from '../assets/slack.svg'
const ShareyourThoughts = () => {
  return (
    <div>
      <Online />
      <div className="m-10 border-b border-gray-200 bg-gray-100  dark:border-gray-600 dark:bg-gray-700">
       
          <div className="flex w-full flex-col  p-4 md:flex-row">
            <div className="mb-4 md:mb-0 md:mr-4">
              <h2 className="mb-1 text-4xl font-extrabold subpixel-antialiased text-gray-900 dark:text-white">
                Share Your Thoughts !!!
              </h2>
              <p className=" flex items-center text-sm p-2 text-justify font-normal text-gray-500 dark:text-gray-400">
                Your feedback is valuable to us. By sharing your thoughts, you help us understand
                what we're doing well and where we can improve. Whether it's a feature you love, an
                issue you've encountered, or a suggestion for something new, we want to hear from
                you. Please take a moment to provide your insights. Your input directly influences
                the enhancements we make to better serve you. Thank you for helping us create a
                better experience for everyone!
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-4 justify-center  text-nowrap  items-center p-10 ">
              <a
                href="mailto:kavirasa@amazon.com"
                className=" inline-flex items-center justify-center rounded-lg bg-cyan-700
             px-2 py-2 text-lg font-semibold  text-white hover:bg-cyan-800
              focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600
               dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                give your feedback
                <HiArrowRight className="ml-2 h-4 w-4" />
              </a>
              <p> (or)</p>
              <a
                href="https://slack.com/app_redirect?channel=D03QDN12JAU"
                target="__blank"
                className="flex flex-row items-center justify-center w-40 rounded-lg bg-fuchsia-900 p-0.5"
              >
                <img src={slack} className="w-10 h-10" />
                <p className="text-white font-semibold px-2 ">Slack Me!! </p>
              </a>
            </div>
      
      </div>
      <div className="absolute w-full bottom-0">
        <Footer />
      </div>
    </div>
  )
}

export default ShareyourThoughts
