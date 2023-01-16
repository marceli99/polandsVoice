import React from 'react';
import './App.css';
import './Fonts.css';
import {Navbar} from "./Navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import {MainPage} from "./Pages/MainPage/MainPage";
import {PollsPage} from "./Pages/PollsPage/PollsPage";
import {Footer} from "./Footer/Footer";
import {AdminPage} from "./Pages/AdminPage/AdminPage";
import {CreatePollPage} from "./Pages/CreatePollPage/CreatePollPage";

function App() {
    return (
        <div className='App'>
            <Navbar/>
            <Routes>
                <Route path={'/'} element={<MainPage/>}></Route>
                <Route path={'/polls'} element={<PollsPage/>}></Route>
                <Route path={'/admin'} element={<AdminPage/>}></Route>
                <Route path={'/create-poll'} element={<CreatePollPage/>}></Route>
                <Route path={'/edit_poll/:id'} element={<CreatePollPage/>}></Route>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
