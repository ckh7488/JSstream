import styles from '../styles/Home.module.css'
import React, { useState } from 'react';

export default function Home() {
  const [files, setFiles] = useState({})
  const handleFileChange = (e) => {
    setFiles(...e.target.files)
    console.log(e.target.files)
  }
  const handleClickSend = () => {
    console.log(files)
    const myForm = new FormData()
    myForm.append("f", files)
    fetch("/api/recNretStream", {
      method: "POST",
      body: myForm
    })
      .then(async r => {
        const reader = r.body.getReader()
        let isEnd = false
        while (!isEnd) {
          await reader.read().then(({ done, value }) => {
            if (done) {
              isEnd = done
              console.log("done")
              return
            }
            console.log(value)
          })
        }
      })
  }
  return (
    <div className={styles.container}>
      <div>
        <input type="file" id="fileInput" multiple onChange={handleFileChange}></input>
        <button onClick={handleClickSend}>Send</button>
      </div>
    </div>
  )
}


