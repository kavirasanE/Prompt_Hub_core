import React, { useState } from 'react'
import { Online } from '../components/Sidebar'
import ProfileCard from '../components/contributors/ProfileCard'
import Marquee from 'react-fast-marquee'
import goodwin from '../assets/teamphoto/goodwin.jpg'
import sathish from '../assets/teamphoto/sathish.jpg'
import sowbar from '../assets/teamphoto/sowbar.jpg'
import suriyakala from '../assets/teamphoto/suriyakala.jpg'
import benisha from '../assets/teamphoto/benisha.jpg'
import saravana from '../assets/teamphoto/saravana.jpg'
import priya from '../assets/teamphoto/priya.jpg'
import dayalu from '../assets/teamphoto/dayalu.jpg'
import monica from '../assets/teamphoto/monica.jpg'
import subaash from '../assets/teamphoto/subaash.jpg'
import sriram from '../assets/teamphoto/sriram.jpg'
import niranjan from '../assets/teamphoto/niranjan.jpg'
import kavirasa from '../assets/teamphoto/kavirasa.jpg'
import praveen from '../assets/teamphoto/praveen.jpg'
import joseph from '../assets/teamphoto/joseph.jpg'
import asha from '../assets/teamphoto/asha.jpg'
import john from '../assets/teamphoto/john.jpg'
import aaminah from '../assets/teamphoto/aaminah.jpg'
import vignesh from '../assets/teamphoto/vignesh.jpg'
import Footer from '../components/Footer'

const Contributors = () => {
  const developer = [
    {
      name: 'KAVIRASAN E',
      photo: kavirasa, // Assuming this is a variable or a placeholder for the actual photo URL
      username: 'kavirasa',
      years: 2
    }
  ]
  const Seniorwhateam = [
    {
      name: 'Satheesh G',
      photo: sathish, // Assuming this is a variable or a placeholder for the actual photo URL
      username: 'sathguna',
      years: 5
    },
    {
      name: 'SOWBARANEKA N.V',
      photo: sowbar, // Assuming this is a variable or a placeholder for the actual photo URL
      username: 'sowbar',
      years: 5
    },
    {
      name: 'Suriyakala V',
      photo: suriyakala, // Assuming this is a variable or a placeholder for the actual photo URL
      username: 'vsuriya',
      years: 5
    },
    {
      name: 'Benisha J',
      photo: benisha, // Assuming this is a variable or a placeholder for the actual photo URL
      username: 'benishj',
      years: 4
    },
    {
      name: 'Saravanakumar N',
      photo: saravana, // Assuming this is a variable or a placeholder for the actual photo URL
      username: 'nasrav',
      years: 4
    },
    {
      name: 'Priyadharsini Paramasivam',
      photo: priya, // Assuming this is a variable or a placeholder for the actual photo URL
      username: 'papriyad',
      years: 4
    },
    {
      name: 'R, DAYALU',
      photo: dayalu, // Assuming this is a variable or a placeholder for the actual photo URL
      username: 'zrdayal',
      years: 4
    },
    {
      name: 'Monica Gauthama',
      photo: monica, // Assuming this is a variable or a placeholder for the actual photo URL
      username: 'mggautha',
      years: 4
    }
  ]

  const deviceassociate = [
    {
      name: 'Goodwin A',
      photo: goodwin, // Assuming this is a variable or a placeholder for the actual photo URL
      username: 'goodwira',
      years: 2
    },
    {
      name: 'Subaash K',
      photo: subaash, // Assuming this is a variable or a placeholder for the actual photo URL
      username: 'ksubaasq',
      years: 3
    },
    {
      name: 'Sriram V',
      photo: sriram, // Assuming this is a variable or a placeholder for the actual photo URL
      username: 'jvsrira',
      years: 3
    },
    {
      name: 'NIRANJAN IMMANUVEL',
      photo: niranjan, // Assuming this is a variable or a placeholder for the actual photo URL
      username: 'niranimm',
      years: 2
    }
  ]

  const otherAssociates = [
    {
      name: 'praveen j',
      photo: praveen, // Assuming this is a variable or a placeholder for the actual photo URL
      username: 'praveejh',
      years: 2
    },
    {
      name: 'Johnson Paul',
      photo: john, // Assuming this is a variable or a placeholder for the actual photo URL
      username: 'ashokajo',
      years: 2
    },
    {
      name: 'G.JOSEPH',
      photo: joseph, // Assuming this is a variable or a placeholder for the actual photo URL
      username: 'gzjosep',
      years: 5
    },
    {
      name: 'Asha J',
      photo: asha, // Assuming this is a variable or a placeholder for the actual photo URL
      username: 'ashajaya',
      years: 5
    }
  ]
  const Managers = [
    {
      name: 'Aaminah Khursheed N',
      photo: aaminah, // Assuming this is a variable or a placeholder for the actual photo URL
      username: 'aaminahn',
      years: 5
    },
    {
      name: 'Vignesh Arjunan',
      photo: vignesh, // Assuming this is a variable or a placeholder for the actual photo URL
      username: 'arjunavi',
      years: 2
    }
  ]

  return (
    <div>
      <Online />
      <p className="font-bold text-3xl p-2 text-center ">Design and Developed By</p>
      <p className="border mx-10 border-b-0 border-black"></p>
      <div className="flex justify-center">
        <a
          href="https://phonetool.amazon.com/users/kavirasa"
          target="_blank"
          className="cursor-pointer"
        >
          {developer.map((data, index) => (
            <ProfileCard data={data} key={index} />
          ))}
        </a>
      </div>

      <p className="font-bold text-3xl p-2 text-center ">
        PromptHub: Revolutionizing Command Execution
      </p>
      <p className="border mx-10 border-b-0 border-black"></p>
      <div className='px-3 flex flex-col justify-center gap-2 text-justify'>
      <p className='p-2'><strong>PromptHub</strong> is an innovative application designed to simplify and enhance the way you interact with command-line interfaces. Instead of manually typing commands into a command prompt, PromptHub allows you to execute commands directly through an intuitive graphical user interface. Here’s a brief overview of its features and capabilities:</p>
        
        <h2 className='font-bold'>Key Features : </h2>
        <p className="border border-b-0 border-black"></p>
        <ul className='p-2 flex flex-col gap-4'>
            <li><strong>One-Click Command Execution :</strong>
                <ul>
                    <li>Execute commands with a single click, eliminating the need to type complex command lines.</li>
                    <li>Browse a curated list of commonly used commands for various tasks and platforms.</li>
                </ul>
            </li>
            <li><strong>Real-Time Output Display : </strong>
                <ul>
                    <li>View the output of executed commands directly within the application.</li>
                    <li>Track the progress of commands and see real-time updates.</li>
                </ul>
            </li>
            <li><strong>Log Management : </strong>
                <ul>
                    <li>Automatically log the output of each command execution.</li>
                    <li>Save logs to Notepad or other text editors for further analysis and record-keeping.</li>
                    <li>Easily access and review past logs within the application.</li>
                </ul>
            </li>
            <li><strong>User-Friendly Interface : </strong>
                <ul>
                    <li>Intuitive design with easy navigation and command categorization.</li>
                    <li>Search functionality to quickly find specific commands or log entries.</li>
                </ul>
            </li>
            <li><strong>Custom Command Templates : </strong>
                <ul>
                    <li>Create and save custom command templates for repetitive tasks.</li>
                    <li>Share command templates with team members for consistent execution.</li>
                </ul>
            </li>
            <li><strong>Multi-Device Support : </strong>
                <ul>
                    <li>Execute commands on multiple devices from a single interface.</li>
                    <li>Manage logs and outputs from different devices seamlessly.</li>
                </ul>
            </li>
        </ul>
        
        <h2 className='font-bold'>Upcoming Features : </h2>
        <p className="border border-b-0 border-black"></p>
        <ul className='flex flex-col gap-2'>
            <li><strong>Bug Report Templates : </strong>
                <ul>
                    <li>Pre-defined templates to quickly report bugs and issues.</li>
                    <li>Automatically include relevant log files and system information for faster troubleshooting.</li>
                </ul>
            </li>
            <li><strong>Enhanced Multi-Device Log Commands : </strong>
                <ul>
                    <li>Advanced features for managing and viewing logs from multiple devices simultaneously.</li>
                    <li>Aggregated views to compare outputs and detect anomalies across devices.</li>
                </ul>
            </li>
            <li><strong>Integrated Scripting Environment : </strong>
                <ul>
                    <li>Write, test, and execute scripts directly within PromptHub.</li>
                    <li>Integrated debugging tools to streamline script development.</li>
                </ul>
            </li>
            <li><strong>Cloud Sync and Backup : </strong>
                <ul>
                    <li>Sync your command templates, logs, and settings to the cloud.</li>
                    <li>Secure backups to ensure you never lose important data.</li>
                </ul>
            </li>
            <li><strong>Collaboration Tools : </strong>
                <ul>
                    <li>Share commands, templates, and logs with team members.</li>
                    <li>Real-time collaboration features for remote teams.</li>
                </ul>
            </li>
        </ul>
        
        <h2 className='font-bold'>Benefits: </h2>
        <p className="border border-b-0 border-black"></p>
        <ul className='flex flex-col gap-3'>
            <li><strong>Efficiency</strong>: Save time and reduce errors by eliminating manual command entry.</li>
            <li><strong>Organization</strong>: Keep all your command outputs and logs organized and easily accessible.</li>
            <li><strong>Collaboration</strong>: Improve team collaboration with shared resources and real-time updates.</li>
            <li><strong>Scalability</strong>: Manage multiple devices and large-scale operations effortlessly.</li>
        </ul>
        
        <p className='font-bold text-sm '>PromptHub is your all-in-one solution for command execution, log management, and collaborative troubleshooting. Transform the way you work with command-line interfaces and experience unprecedented productivity and convenience.</p>
        
        <p className='text-sm font-semibold'>Download PromptHub today and take the first step towards a more efficient and organized command execution workflow!</p>
        </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Contributors

{
  /* <p className="font-bold p-2 text-xl underline"> L4 & L5 Managers</p>
      <div className=" p-2 grid grid-cols-5 justify-center items-center ">
        {Managers.map((data, index) => (
          <ProfileCard data={data} key={index} />
        ))}
      </div>
      <p className="font-bold p-2 text-xl underline"> Alexa Whole Home Audio (WHA) Team</p>
      <p className="font-bold p-1 text-center text-lg underline italic">Senior Device Associates</p>
      <div className=" p-2 grid grid-cols-5 justify-center items-center ">
        {Seniorwhateam.map((data, index) => (
          <ProfileCard data={data} key={index} />
        ))}
      </div>
      <p className="border mx-10 border-b-0 border-black"></p>
      <p className="font-bold p-1 text-center text-lg underline italic"> Device Associates</p>
      <div className=" p-2 grid grid-cols-5 ">
        {deviceassociate.map((data, index) => (
          <ProfileCard data={data} key={index} />
        ))}
      </div>
      <p className="border mx-10 border-b-0 border-black"></p>
      <div>
        <p className="font-bold p-2 text-xl underline italic">Singleton & MultiModal Team:</p>
        <div className=" p-2 flex flex-row ">
          {otherAssociates.map((data, index) => (
            <ProfileCard data={data} key={index} />
          ))}
        </div>
      </div>  */
}
