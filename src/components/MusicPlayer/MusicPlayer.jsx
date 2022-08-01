import React, {useEffect, useRef, useState} from "react"
import styled from "styled-components"
import {FaPause, FaPlay} from "react-icons/fa"
import axios from "axios"

import "./musicPlayer.css"
import {BsArrowsFullscreen, BsFillPlayFill, BsPauseFill} from "react-icons/bs";
import {VolumeSlider} from "./VolumeSlider";

const MusicPlayerContainer = styled.div`
  width: 100%;
  height: var(--bar-height);
  background-color: black;
  position: relative;
`

const MusicPlayer = (props) => {

    const [currentSong, setCurrentSong] = useState()
    const [songName, setSongName] = useState()
    const [songArtist, setSongArtist] = useState()
    const [isPlaying, setIsPlaying] = useState(false)

    // Time
    const [startTime, setStartTime] = useState(0)
    const [nextStartTime, setNextStartTime] = useState(0)

    // Audio
    const myAudio = useRef()

    const radioAPI = "https://coderadio-admin.freecodecamp.org/api/live/nowplaying/coderadio"

    useEffect(() => {
        let timeRemaining

        const runAPI = () => {
            axios.get(radioAPI)
                .then(r => {
                    if (r.status !== 200) return
                    const data = r.data
                    setCurrentSong(data["station"]["listen_url"])
                    setSongName(data["now_playing"]["song"]["title"])
                    setSongArtist(data["now_playing"]["song"]["artist"])
                    timeRemaining = data["now_playing"]["remaining"]
                })
        }
        runAPI()

        setInterval(() => {
            if (timeRemaining > 0) timeRemaining--
            else runAPI()
        }, 1000)
    }, [])

    const toggleAudio = () => {
        if (!currentSong) return
        if (isPlaying) myAudio.current.pause()
        else myAudio.current.play()
    }

    return (
        <MusicPlayerContainer>
            <audio
                src={currentSong}
                ref={myAudio}
                type="audio"
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
            />

            <div className="py-4 px-6 grid grid-cols-3 h-full">
                <div className="flex items-center h-full">
                    <p className="text-sm"><b>{songName}</b> ~ {songArtist}</p>
                </div>
                <div className="flex items-center justify-center h-full">
                    <button onClick={toggleAudio}>
                        {isPlaying ? <BsPauseFill size={40}/> : <BsFillPlayFill size={40}/>}
                    </button>
                </div>
                <div className="flex items-center justify-end h-full">
                    <div className="flex">
                        <VolumeSlider audioRef={myAudio}/>
                        <button className="ml-10"
                                onClick={props.fullScreenHandle.active ?
                                    props.fullScreenHandle.exit : props.fullScreenHandle.enter}>
                            <BsArrowsFullscreen className="text-xl md:text-2xl"/>
                        </button>
                    </div>
                </div>
            </div>
        </MusicPlayerContainer>
    )
}

// export default withRouter(MusicPlayer)
export default MusicPlayer