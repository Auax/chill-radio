import styled from "styled-components"
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import {FullScreen, useFullScreenHandle} from "react-full-screen";

const HeaderDiv = styled.div`
  height: calc(100vh - var(--bar-height));
`

function App() {

    const fullScreenHandle = useFullScreenHandle()

    return (
        <FullScreen handle={fullScreenHandle}>
            <div className="App">
                <header>
                    <HeaderDiv>
                        <iframe src='https://my.spline.design/80smesh-1237dd671d8a1d53f17055be19d9c11f/'
                                style={{border: 0}} width='100%' height='100%'></iframe>
                    </HeaderDiv>
                    <MusicPlayer fullScreenHandle={fullScreenHandle}/>
                </header>
            </div>
        </FullScreen>
    )
}

export default App
