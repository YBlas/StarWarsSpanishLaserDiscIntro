"use client";
import Starfield from "@/app/components/Starfield/StarField";
import "./page.css";
import { useEffect, useRef, useState } from "react";
import { Film } from "@/app/types/Film";
import { api } from "@/api/api";
import { toRoman } from "@/app/utils/utils";


export const FilmIntro = ({ id, setId }: { id: number, setId: (id: number) => void }) => {

    const [openingCrawl, setOpeningCrawl] = useState("");

    const fetchFilm = async (id: number) => {
        try {
            const { data }: { data: Film } = await api.get(`/films/${id}`);
            setOpeningCrawl(`Episode ${toRoman(data.episode_id)}\r\n\r\n${data.title.toUpperCase()}\r\n\r\n${data.opening_crawl}`);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchFilm(Number(id)).then(() => playAll());
    }, [id]);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        const audio = new Audio(`/estarguarras/${id}.mp3`);
        audioRef.current = audio;

        audio.onended = () => {
            setId(0);
        };
        
        audio.play().catch(() => {});
    };

    const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

    const [showBlueText, setShowBlueText] = useState(true);
    const [blueStyleClass, setBlueStyleClass] = useState("BlueText");
    const [showLogo, setShowLogo] = useState(false);
    const [showCrawl, setShowCrawl] = useState(false);

    const playAll = async () => {
        playAudio();
        await sleep(4000);
        setBlueStyleClass("BlueText Dissappear");
        await sleep(1000);
        setShowBlueText(false);
        await sleep(1800);
        setShowLogo(true);
        await sleep(11000);
        setShowCrawl(true);
        await sleep(92000);
        setShowLogo(false);
        setShowCrawl(false);
    }

    return(
        <div className="IntroContainer">
            <Starfield/>
            {showBlueText && (
                <h1 className={blueStyleClass}>A long time ago in a galaxy far,<br/>far away...</h1>
            )}
            {showLogo && (
                <img className="Logo" src="/estarguarras/logo.png" alt="Logo"/>
            )}
            {showCrawl && (
                <div className="CrawlWrapper">
                    <p className="Crawl">{openingCrawl}</p>
                </div>
            )}
        </div>
    )
};