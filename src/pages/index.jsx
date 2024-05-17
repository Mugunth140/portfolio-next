"use client";
import Head from "next/head";
import {useEffect, useState} from "react";
import "../styles/Home.module.scss";
import SplitType from "split-type";
//import Hero from '@/components/Hero3d/Hero'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { IoIosArrowRoundDown } from "react-icons/io";
import Magnetic from "@/components/Magnetic/magnetic";
//import Lenis from "lenis";
import Marquee from "@/components/Marquee/Marquee";
import Project from "@/components/Project/Project";
import ProjectMobile from "@/components/Project/ProjectMobile";


gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useGSAP(() => {
    const split = new SplitType(".split", {
      types: "chars",
    });

    const mainSplit = new SplitType(".main-text", {
      types: "chars,words",
      charsClass: "char",
      wordsClass: "word",
    });

    // const lenis = new Lenis();

    // lenis.on("scroll", ScrollTrigger.update);

    // gsap.ticker.add((time) => {
    //   lenis.raf(time * 1000);
    // });

    gsap.ticker.lagSmoothing(0);

    const tl = gsap.timeline();
    tl.from(
      split.chars,
      {
        duration: 1,
        y: 30,
        opacity: 0,
        stagger: 0.05,
        ease: "power4.out",
      },
      ">"
    )
      .from(".dot", {
        width: 0,
        duration: 1,
        ease: "power4.out",
      })
      .from(
        ".ball-container",
        {
          y: 400,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
        },
        "<+0.5"
      );

    gsap.to(".ball-container", {
      scrollTrigger: {
        trigger: ".ball-container",
        start: "top 80%",
        end: "top 60%",
        //markers: true,
        scrub: true,
      },
      scale: 1,
      duration: 1,
      ease: "expo.out",
      borderRadius: "0px",
    });

    const mainText = gsap.timeline({
      defaults: { duration: 0.5, ease: "power3.out" },
    });

    mainText.from(mainSplit.chars, { opacity: 0, y: 30, stagger: 0.1 });

    ScrollTrigger.create({
      animation: mainText,
      trigger: ".chars",
      start: "70% center",
      end: "bottom center",
      scrub: true,
      //markers:true,
    });
  }, []);

  return (
    <>
      <Head>
        <title>Mugunth | Portfolio</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="hero-wrapper">
        <div className="hero-text-wrapper">
          {/* <Hero /> */}
          <div className="hero-text">
            <h1 className="design split">design</h1>
            <span className="dot"></span>
            <h1 className="develop split">develop</h1>
          </div>
        </div>

        {/* hero ball container starts here  */}
        <div className="ball-container">
          <div className="pink-ball"></div>
          <div className="blue-ball"></div>
          <div className="ball-text">
            <h1 className="main-text">
              Hello There! I&apos;m Mugunth, a passionate Web Developer based in
              India. I possess expertise in building scalable and maintainable
              Web applications that prioritize exceptional Ui & Ux.
            </h1>
          </div>
          <Magnetic >
          <div className="scroll-down" href="#">
            Scroll down <IoIosArrowRoundDown className="down-arrow" />
          </div>
          </Magnetic>
        </div>
        <Marquee /> 
         {
          isMobile ? <ProjectMobile /> : <Project />
        }
      </div>
    </>
  );
}
