import LoggedOutOnlyRoute from "@components/shared/layouts/LoggedOutOnlyRoute";
import type { NextPage } from "next";
import { motion, useInView } from "framer-motion";
import styles from "../styles/Home.module.css";
import { Button } from "@components/shared/elements/Button";
import Link from "next/link";
import Image from "next/image";
import { ResponseTestIcon } from "@components/features/Dashboard/Applications/ResponseTest";
import { InteractiveQuizIcon } from "@components/features/Dashboard/Applications/InteractiveQuiz";
import { VideoConferenceIcon } from "@components/features/Dashboard/Applications/VideoConference";
import { OdiLogo } from "@components/shared/svg/OdiLogo";

const buttonStyles: React.CSSProperties = {
  margin: 0,
  fontSize: "1.5rem",
  fontWeight: "bold",
  padding: 0,
  minWidth: 200,
  height: 60,
};

const Roller: React.FC<{ words: string[] }> = ({ words }) => {
  return (
    <motion.div className={`${styles["roller-container"]}`}>
      {words.map((word) => (
        <motion.span
          animate={{ y: ["0%", "-100%", "-200%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            type: "spring",
            duration: 3,
          }}
          key={word}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Home: NextPage = () => {
  return (
    <LoggedOutOnlyRoute>
      <main className={`${styles["home-body"]}`}>
        <header className={`${styles["home-banner"]}`}>
          <motion.section
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
            className={`${styles["banner-content"]} ${styles["banner-captions"]}`}
          >
            <h1>Your one stop solution for all your assessment needs.</h1>
            <div className={`${styles["button-container_parent"]}`}>
              <div className={`${styles["button-container"]}`}>
                <Button style={buttonStyles} variant="primary">
                  <Link href={"/accounts/signup/"}>Join now!</Link>
                </Button>
              </div>
              <div className={`${styles["button-container"]}`}>
                <Button style={buttonStyles} variant="secondary">
                  <Link href={"/accounts/login/assessee/"}>Login</Link>
                </Button>
              </div>
            </div>
          </motion.section>
          <motion.section
            initial={{ x: 150 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            className={`${styles["banner-content"]}`}
          >
            <div className={`${styles["banner-video"]}`}>
              <video autoPlay playsInline loop muted>
                <source src="/home/showcase.mp4/" />
              </video>
            </div>
          </motion.section>
        </header>
        <article className={`${styles["feature-catalog"]}`}>
          <h2 className={`${styles["feature-catalog_header"]}`}>
            Assessing employee performance is hard.
          </h2>
          <p className={`${styles["catalog-description"]}`}>
            Most of the time companies have to resort to using different{" "}
            <span style={{ color: "#fc034a", fontWeight: "bold" }}>
              external
            </span>{" "}
            software for different types of assessments. ODI provides companies
            and assessors with an{" "}
            <span style={{ color: "#0356fc", fontWeight: "bold" }}>
              all-in-one
            </span>{" "}
            solution for every need.
          </p>
          <div className={`${styles["feature"]}`}>
            <div className={`${styles["feature-image_container"]}`}>
              <div className={`${styles["image-glue"]}`}>
                <div
                  style={{ top: "-50%", left: "-50%" }}
                  className={`${styles["image-container"]}`}
                >
                  <Image
                    src="/home/dashboard-features.jpg"
                    layout="fill"
                    alt="dashboard-features"
                  />
                </div>
                <div
                  style={{ bottom: "-50%", right: "-50%" }}
                  className={`${styles["image-container"]}`}
                >
                  <Image
                    src="/home/dashboard-notifs.jpg"
                    layout="fill"
                    alt="dashboard-features"
                  />
                </div>
              </div>
            </div>
            <div className={`${styles["feature-description"]}`}>
              <header>Packed with features</header>
              <p className={`${styles["description"]}`}>
                One Day Intern greets employers with a rich array of tools to
                assess their employees with.
              </p>
              <div className={`${styles["feature-list"]}`}>
                <div className={`${styles["feature-item"]}`}>
                  <div className={`${styles["item-icon"]}`}>
                    <ResponseTestIcon />
                  </div>
                  <div className={`${styles["item-descriptor"]}`}>
                    Put your employees communication skills to the test with the
                    email response test.{" "}
                    <span style={{ fontWeight: "bold" }}>(Coming soon)</span>
                  </div>
                </div>
                <div className={`${styles["feature-item"]}`}>
                  <div className={`${styles["item-icon"]}`}>
                    <InteractiveQuizIcon />
                  </div>
                  <div className={`${styles["item-descriptor"]}`}>
                    Assignments? We got them. Quizzes? You betcha{" "}
                    <span style={{ fontWeight: "bold" }}>(Coming soon)</span>.
                    Test the boundaries of your employees&apos; knowledge.
                  </div>
                </div>
                <div className={`${styles["feature-item"]}`}>
                  <div className={`${styles["item-icon"]}`}>
                    <VideoConferenceIcon />
                  </div>
                  <div className={`${styles["item-descriptor"]}`}>
                    People skills are important too. Luckily, ODI provides a way
                    for you to setup mock video conferences.
                  </div>
                </div>
                <div className={`${styles["feature-item"]}`}>
                  <div className={`${styles["item-icon"]}`}>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 46 44"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.7199 22.8516L11.2603 24.1272C11.5574 23.7685 11.7199 23.3174 11.7199 22.8516H9.7199ZM36.2801 22.8516H34.2801C34.2801 23.3174 34.4426 23.7685 34.7397 24.1272L36.2801 22.8516ZM3.08784 30.8601L1.54746 29.5845L3.08784 30.8601ZM3.21916 31.4427L2.29089 33.2142H2.29089L3.21916 31.4427ZM42.9122 30.8601L44.4525 29.5845L42.9122 30.8601ZM42.7808 31.4427L43.7091 33.2142L42.7808 31.4427ZM4.62822 32.1358L11.2603 24.1272L8.17952 21.576L1.54746 29.5845L4.62822 32.1358ZM11.7199 22.8516V18.1453H7.7199V22.8516H11.7199ZM34.2801 18.1453V22.8516H38.2801V18.1453H34.2801ZM34.7397 24.1272L41.3718 32.1358L44.4525 29.5845L37.8205 21.576L34.7397 24.1272ZM1.54746 29.5845C0.515782 30.8303 1.02582 32.5513 2.29089 33.2142L4.14742 29.6711C4.95714 30.0954 5.34425 31.2711 4.62822 32.1358L1.54746 29.5845ZM41.3718 32.1358C40.6557 31.2711 41.0429 30.0954 41.8526 29.6711L43.7091 33.2142C44.9742 32.5513 45.4842 30.8303 44.4525 29.5845L41.3718 32.1358ZM41.8526 29.6711C30.197 35.7785 15.803 35.7785 4.14742 29.6711L2.29089 33.2142C15.1092 39.9308 30.8908 39.9308 43.7091 33.2142L41.8526 29.6711ZM38.2801 18.1453C38.2801 10.2164 31.2479 4.11803 23 4.11803V8.11803C29.4209 8.11803 34.2801 12.7892 34.2801 18.1453H38.2801ZM11.7199 18.1453C11.7199 12.7892 16.5791 8.11803 23 8.11803V4.11803C14.7521 4.11803 7.7199 10.2164 7.7199 18.1453H11.7199ZM28.5062 36.8398C28.5062 37.8779 28.0857 38.5644 27.3484 39.0683C26.5293 39.6279 25.233 40 23.5774 40V44C25.7484 44 27.9165 43.5248 29.6052 42.3708C31.3756 41.1609 32.5062 39.2674 32.5062 36.8398H28.5062ZM23.5774 40C21.9217 40 20.6255 39.6279 19.8065 39.0683C19.0692 38.5644 18.6487 37.8779 18.6487 36.8398H14.6487C14.6487 39.2674 15.7792 41.1609 17.5496 42.3708C19.2383 43.5248 21.4064 44 23.5774 44V40ZM32.5062 36.8398V35.794H28.5062V36.8398H32.5062ZM18.6487 36.8398V35.794H14.6487V36.8398H18.6487ZM28.1757 4.35316C28.1757 1.76712 25.9259 0 23.5774 0V4C23.8048 4 23.9742 4.08301 24.0721 4.17163C24.1667 4.25733 24.1757 4.32375 24.1757 4.35316H28.1757ZM23.5774 0C21.2289 0 18.9791 1.76712 18.9791 4.35316H22.9791C22.9791 4.32375 22.9881 4.25733 23.0827 4.17163C23.1805 4.08301 23.35 4 23.5774 4V0ZM24.1757 4.35316V6.11803H28.1757V4.35316H24.1757ZM18.9791 4.35316V6.11803H22.9791V4.35316H18.9791Z"
                        fill="#3D65D8"
                      />
                    </svg>
                  </div>
                  <div className={`${styles["item-descriptor"]}`}>
                    Don&apos;t worry, your assessees are always notified of
                    assessment events by our realtime notification system
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles["feature"]} ${styles["flex-reversed"]}`}>
            <div className={`${styles["feature-description"]}`}>
              <header>The sky is the limit</header>
              <p className={`${styles["description"]}`}>
                One Day Intern provides customizable tools for companies and
                assessors to play around with. Create custom-tailored
                assessments to match your work environment.
              </p>
              <div className={`${styles["assessor-tagline"]}`}>
                assess your <Roller words={["current", "future", "senior"]} />{" "}
                employees.
              </div>
            </div>
            <div className={`${styles["next-image_container"]}`}>
              <Image
                src="/home/test-flow-builder.gif"
                layout="fill"
                objectFit="contain"
                alt="test flow builder"
              />
            </div>
          </div>
        </article>
      </main>
      <footer className={styles.footer}>
        <div>
          <OdiLogo />
          <p>Created with ❤️ by Mintan</p>
          <p>©️ 2022 OneDayIntern, All rights reserved.</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p>
            Contact us at:{" "}
            <span style={{ fontWeight: "bold" }}>
              onedayinternsolution@gmail.com
            </span>
          </p>
          <p>Powered by: Vercel, Google Cloud Platform, 100ms</p>
        </div>
      </footer>
    </LoggedOutOnlyRoute>
  );
};

export default Home;
