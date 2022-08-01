import styled from "styled-components"
import React, {useEffect, useRef, useState} from "react"
import {HiVolumeOff, HiVolumeUp} from "react-icons/hi";

export const VolumeSliderInput = styled.input`
  appearance: none;
  outline: none;
  background-color: #2c2c2c;
  height: 10px;
  border-radius: 20px;
  cursor: pointer;
  max-width: 100px;
  margin-right: 10px;
  z-index: 1;
  
  &::-webkit-slider-thumb, &::-moz-range-thumb{
    border: none;
  }

  @media (max-width: 500px) {
    & {
      max-width: 50px;
    }
  }
`

export const VolumeSlider = (props) => {
    const [volume, setVolume] = useState(100)
    const [prevVolume, setPrevVolume] = useState(volume)
    const RangeRef = useRef()

    const muteSound = () => {
        setPrevVolume(volume > 0 ? volume : 100)
        let newVolume = volume > 0 ? 0 : prevVolume
        setVolume(newVolume)
        RangeRef.current.value = newVolume
    }

    useEffect(() => {
        RangeRef.current.value = volume
    }, [RangeRef])

    useEffect(() => {
        console.log(props.audioRef)
        props.audioRef.current.volume = volume / 100
    }, [volume])


    return (
        <div className="items-center btn btn-secondary h-full text-white hidden md:flex">
            <VolumeSliderInput type="range" ref={RangeRef} min="0" max="100"
                               onChange={(e) => setVolume(e.target.value)}/>
            <button onClick={muteSound} className="hover:opacity-80" >
                {volume > 0 ?
                    <HiVolumeUp size={25}/> :
                    <HiVolumeOff size={25}/>}
            </button>
        </div>

    )
}