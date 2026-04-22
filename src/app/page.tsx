"use client";
import { useEffect, useState } from "react";
import Starfield from "./components/Starfield/StarField";
import "./page.css";
import { api } from "@/api/api";
import { Film } from "./types/Film";
import FilmPoster from "./components/FilmPoster/FilmPoster";
import { FilmIntro } from "./components/FilmIntro";

const Home = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const fetchFilms = async () => {
    try {
      const { data }: { data: Film[] } = await api.get("/films");
      setFilms(data.filter((film) => film.episode_id > 3));
    } catch (error) {
      console.error(error);
    }
  };

  const [selectedId, setSelectedId] = useState<number>(0);

  useEffect(() => {
    fetchFilms();
  }, []);

  if (selectedId > 0) {
    return (
      <FilmIntro
        id={selectedId}
        setId={(id: number) => {
          setSelectedId(id);
        }}
      />
    );
  }

  return (
    <div className="HomeContainer">
      <Starfield />
      {films.map((film) => (
        <FilmPoster
          key={film.episode_id}
          idFilm={Number(film.url.at(-1))}
          setId={setSelectedId}
        />
      ))}
    </div>
  );
};

export default Home;
