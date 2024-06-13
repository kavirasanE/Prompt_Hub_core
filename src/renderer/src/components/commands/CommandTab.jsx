import { Tabs } from 'flowbite-react'
import { useRef, useState } from 'react'
import React from 'react'

const CommandTab = ({ sec, index }) => {
  const tabsRef = useRef(0)
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div key={index}>
      <Tabs
        aria-label="Default tabs"
        ref={tabsRef}
        onActiveTabChange={(tab) => setActiveTab(tab)}
      >
        <Tabs.Item active title={sec}></Tabs.Item>
      </Tabs>
    </div>
  )
}

export default CommandTab
