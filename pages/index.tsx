import LoggedOutOnlyRoute from "@components/shared/layouts/LoggedOutOnlyRoute";
import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import React, { useState } from "react";
import { motion } from "framer-motion";
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

const Home: NextPage = () => {
  const [isHeroBtnHover, setHeroBtnHover] = useState(false);
  return (
    <LoggedOutOnlyRoute>
      <main className={styles["home"]}>
        <nav className={styles["nav"]}>
          <OdiLogo width={50} height={60} />
          <Link href="/accounts/login/assessee">
            <a className={styles["nav-link"]}>Login</a>
          </Link>
        </nav>
        <header className={styles["home--hero"]}>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
            className={styles["header__title"]}
          >
            Work isn&apos;t a{" "}
            <motion.span
              initial={{ filter: "brightness(0)" }}
              whileHover={{
                filter: "brightness(1)",
                transition: {
                  type: "tween",
                },
              }}
              style={{
                background: "linear-gradient(to right,#FF4D4D,#F9CB28)",
              }}
              className={styles["header__title-bgclip"]}
            >
              test
            </motion.span>
            .
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 1, type: "tween" },
            }}
            className={styles["header__title"]}
          >
            It&apos;s an{" "}
            <motion.span
              initial={{ filter: "brightness(0)" }}
              whileHover={{
                filter: "brightness(1)",
                transition: {
                  type: "tween",
                },
              }}
              style={{
                background: "linear-gradient(to right,#007CF0,#00DFD8)",
              }}
              className={styles["header__title-bgclip"]}
            >
              experience
            </motion.span>
            .
          </motion.h1>
          <section className={styles["header__subtitle"]}>
            <motion.p
              className={styles["header__subtitle--text"]}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 1.5 } }}
            >
              One Day Intern provides a convenient solution for all your
              company&apos;s employee assessment needs.
            </motion.p>
          </section>
          <Link href="/accounts/signup">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 1.65 } }}
              whileTap={{ scale: 0.97 }}
              whileHover={{
                backgroundColor: "#6a88e2",
                transition: { type: "tween" },
              }}
              onMouseOver={() => setHeroBtnHover(true)}
              onMouseLeave={() => setHeroBtnHover(false)}
              className={styles.btn}
            >
              Get started
              <motion.svg
                animate={{ x: isHeroBtnHover ? 5 : 0 }}
                width={15}
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </motion.svg>
            </motion.button>
          </Link>
        </header>
        <div className={styles["curve"]}></div>
        <section
          id="immersion"
          className={`${styles["home__section"]} ${styles["home__section--row"]} ${styles["home__section--purple"]}`}
        >
          <motion.article
            className={styles["section__article"]}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.3, type: "tween", duration: 0.5 },
            }}
            viewport={{
              once: true,
            }}
          >
            <h1
              className={`${styles["section__title"]} ${styles["section__title--white"]}`}
            >
              Full Immersion.
            </h1>
            <p
              className={`${styles["section__content"]} ${styles["section__content--white"]}`}
            >
              In One Day Intern, we value the importance of parity between
              assessments and real-life work habits. We aim to provide an
              assessment experience as close as real-life work as possible.
            </p>
          </motion.article>
          <motion.div
            className={styles["video-wrapper"]}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.3, type: "tween", duration: 0.5 },
            }}
            viewport={{
              once: true,
            }}
          >
            <video autoPlay playsInline loop muted>
              <source src="/home/showcase.mp4/" />
            </video>
          </motion.div>
        </section>
        <div className={styles["curve-2"]}></div>
        <section
          id="integration"
          className={`${styles["home__section"]} ${styles["home__section--row"]} ${styles["home__section--blue"]}`}
        >
          <motion.div
            className={styles["home__image"]}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.3, type: "tween", duration: 0.5 },
            }}
            viewport={{
              once: true,
            }}
          >
            <div className={styles["home__image--wrapper"]}>
              <Image
                layout="fill"
                objectFit="contain"
                src="/home/dashboard-features.jpg"
                alt="Dashboard features"
              />
            </div>
          </motion.div>
          <motion.article
            className={styles["section__article"]}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.3, type: "tween", duration: 0.5 },
            }}
            viewport={{
              once: true,
            }}
          >
            <h1
              className={`${styles["section__title"]} ${styles["section__title--white"]}`}
            >
              Seamless Integration.
            </h1>
            <p
              className={`${styles["section__content"]} ${styles["section__content--white"]}`}
            >
              ODI provides an all-in-one platform for all assessments without
              the hassle of using different ways to assess your employees.
            </p>
          </motion.article>
        </section>
        <div className={styles["section__divider"]}>
          <svg
            id="visual"
            viewBox="0 0 900 600"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
          >
            <rect x="0" y="0" width="900" height="600" fill="#ffffff"></rect>
            <path
              d="M0 174L13.7 175.5C27.3 177 54.7 180 82 177.2C109.3 174.3 136.7 165.7 163.8 160.2C191 154.7 218 152.3 245.2 153.3C272.3 154.3 299.7 158.7 327 162.7C354.3 166.7 381.7 170.3 409 164.5C436.3 158.7 463.7 143.3 491 145.2C518.3 147 545.7 166 573 175.3C600.3 184.7 627.7 184.3 654.8 173.3C682 162.3 709 140.7 736.2 133.2C763.3 125.7 790.7 132.3 818 134.2C845.3 136 872.7 133 886.3 131.5L900 130L900 0L886.3 0C872.7 0 845.3 0 818 0C790.7 0 763.3 0 736.2 0C709 0 682 0 654.8 0C627.7 0 600.3 0 573 0C545.7 0 518.3 0 491 0C463.7 0 436.3 0 409 0C381.7 0 354.3 0 327 0C299.7 0 272.3 0 245.2 0C218 0 191 0 163.8 0C136.7 0 109.3 0 82 0C54.7 0 27.3 0 13.7 0L0 0Z"
              fill="#d93da9"
            ></path>
            <path
              d="M0 95L13.7 103.3C27.3 111.7 54.7 128.3 82 135C109.3 141.7 136.7 138.3 163.8 141.3C191 144.3 218 153.7 245.2 155.3C272.3 157 299.7 151 327 140.3C354.3 129.7 381.7 114.3 409 107.5C436.3 100.7 463.7 102.3 491 111.5C518.3 120.7 545.7 137.3 573 146.5C600.3 155.7 627.7 157.3 654.8 157.3C682 157.3 709 155.7 736.2 150.8C763.3 146 790.7 138 818 136.7C845.3 135.3 872.7 140.7 886.3 143.3L900 146L900 0L886.3 0C872.7 0 845.3 0 818 0C790.7 0 763.3 0 736.2 0C709 0 682 0 654.8 0C627.7 0 600.3 0 573 0C545.7 0 518.3 0 491 0C463.7 0 436.3 0 409 0C381.7 0 354.3 0 327 0C299.7 0 272.3 0 245.2 0C218 0 191 0 163.8 0C136.7 0 109.3 0 82 0C54.7 0 27.3 0 13.7 0L0 0Z"
              fill="#bf49bb"
            ></path>
            <path
              d="M0 109L13.7 107.2C27.3 105.3 54.7 101.7 82 103.2C109.3 104.7 136.7 111.3 163.8 113.5C191 115.7 218 113.3 245.2 109C272.3 104.7 299.7 98.3 327 99.5C354.3 100.7 381.7 109.3 409 115C436.3 120.7 463.7 123.3 491 117.7C518.3 112 545.7 98 573 97.8C600.3 97.7 627.7 111.3 654.8 111.5C682 111.7 709 98.3 736.2 93.5C763.3 88.7 790.7 92.3 818 96.5C845.3 100.7 872.7 105.3 886.3 107.7L900 110L900 0L886.3 0C872.7 0 845.3 0 818 0C790.7 0 763.3 0 736.2 0C709 0 682 0 654.8 0C627.7 0 600.3 0 573 0C545.7 0 518.3 0 491 0C463.7 0 436.3 0 409 0C381.7 0 354.3 0 327 0C299.7 0 272.3 0 245.2 0C218 0 191 0 163.8 0C136.7 0 109.3 0 82 0C54.7 0 27.3 0 13.7 0L0 0Z"
              fill="#9f54ca"
            ></path>
            <path
              d="M0 77L13.7 72.2C27.3 67.3 54.7 57.7 82 58.2C109.3 58.7 136.7 69.3 163.8 69.8C191 70.3 218 60.7 245.2 58.5C272.3 56.3 299.7 61.7 327 64.8C354.3 68 381.7 69 409 66.5C436.3 64 463.7 58 491 54.2C518.3 50.3 545.7 48.7 573 48.8C600.3 49 627.7 51 654.8 55.3C682 59.7 709 66.3 736.2 69.8C763.3 73.3 790.7 73.7 818 74.2C845.3 74.7 872.7 75.3 886.3 75.7L900 76L900 0L886.3 0C872.7 0 845.3 0 818 0C790.7 0 763.3 0 736.2 0C709 0 682 0 654.8 0C627.7 0 600.3 0 573 0C545.7 0 518.3 0 491 0C463.7 0 436.3 0 409 0C381.7 0 354.3 0 327 0C299.7 0 272.3 0 245.2 0C218 0 191 0 163.8 0C136.7 0 109.3 0 82 0C54.7 0 27.3 0 13.7 0L0 0Z"
              fill="#775ed4"
            ></path>
            <path
              d="M0 22L13.7 26.7C27.3 31.3 54.7 40.7 82 43.2C109.3 45.7 136.7 41.3 163.8 38.7C191 36 218 35 245.2 36.3C272.3 37.7 299.7 41.3 327 43.5C354.3 45.7 381.7 46.3 409 44C436.3 41.7 463.7 36.3 491 33.7C518.3 31 545.7 31 573 35.5C600.3 40 627.7 49 654.8 49.7C682 50.3 709 42.7 736.2 42.2C763.3 41.7 790.7 48.3 818 50C845.3 51.7 872.7 48.3 886.3 46.7L900 45L900 0L886.3 0C872.7 0 845.3 0 818 0C790.7 0 763.3 0 736.2 0C709 0 682 0 654.8 0C627.7 0 600.3 0 573 0C545.7 0 518.3 0 491 0C463.7 0 436.3 0 409 0C381.7 0 354.3 0 327 0C299.7 0 272.3 0 245.2 0C218 0 191 0 163.8 0C136.7 0 109.3 0 82 0C54.7 0 27.3 0 13.7 0L0 0Z"
              fill="#3d65d8"
            ></path>
          </svg>
        </div>
        <section className={styles["home__section"]}>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
            viewport={{ once: true }}
            className={`${styles["section__title"]} ${styles["section__title--center"]}`}
          >
            Choose Your Assessment Methods.
          </motion.h1>

          <motion.p
            className={styles["header__subtitle--text"]}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0, transition: { delay: 1 } }}
            viewport={{ once: true }}
          >
            One Day Intern greets employers with a rich array of tools to assess
            their employees with.
          </motion.p>
          <div
            className={`${styles["home__section"]} ${styles["home__section--cards"]}`}
          >
            <motion.article
              className={styles["section--card"]}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { type: "tween", delay: 1 },
              }}
              viewport={{ once: true }}
            >
              <ResponseTestIcon width={70} height={70} />
              <div className={styles["section--subcard"]}>
                <h4 className={styles["card__title"]}>Response Test</h4>
                <p>
                  How employees reply to work emails is something you are doing
                  the whole work day. Put your employees&apos; skills to the
                  test with the email response test.
                </p>
              </div>
            </motion.article>
            <motion.article
              className={styles["section--card"]}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { type: "tween", delay: 1.1 },
              }}
              viewport={{ once: true }}
            >
              <InteractiveQuizIcon width={70} height={70} />

              <div className={styles["section--subcard"]}>
                <h4 className={styles["card__title"]}>Interactive Quiz</h4>
                <p>
                  Test the boundaries of your employees&apos; knowledge with
                  specifically crafted quizzes to cater to your company&apos;s
                  needs.
                </p>
              </div>
            </motion.article>
            <motion.article
              className={styles["section--card"]}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { type: "tween", delay: 1.2 },
              }}
              viewport={{ once: true }}
            >
              <VideoConferenceIcon width={70} height={70} />

              <div className={styles["section--subcard"]}>
                <h4 className={styles["card__title"]}>Video Conference</h4>
                <p>
                  People skills are important too. Luckily, we provide a way for
                  you to setup mock video conferences.
                </p>
              </div>
            </motion.article>
          </div>
        </section>
        <div className={styles["curve"]}></div>
        <section
          className={`${styles["home__section"]} ${styles["home__section--row"]} ${styles["home__section--purple"]}`}
        >
          <motion.article
            className={styles["section__article"]}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.3, type: "tween", duration: 0.5 },
            }}
            viewport={{
              once: true,
            }}
          >
            <h1
              className={`${styles["section__title"]} ${styles["section__title--white"]}`}
            >
              The sky is the limit.
            </h1>
            <p
              className={`${styles["section__content"]} ${styles["section__content--white"]}`}
            >
              One Day Intern provides customizable tools for companies and
              assessors to play around with. Create custom-tailored assessments
              to match your work environment.
            </p>
          </motion.article>
          <motion.div
            className={styles["home__image"]}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.3, type: "tween", duration: 0.5 },
            }}
            viewport={{
              once: true,
            }}
          >
            <div className={styles["home__image--wrapper"]}>
              <Image
                layout="fill"
                objectFit="contain"
                src="/home/test-flow-builder.gif"
                alt="Dashboard features"
              />
            </div>
          </motion.div>
        </section>
        <div className={styles["curve-3"]}></div>
        <footer className={styles["footer"]}>
          <div>
            <>
              <svg
                width="75"
                height="75"
                viewBox="0 0 407 315"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_425_1796"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="63"
                  width="395"
                  height="252"
                >
                  <path
                    d="M14.0002 314.47V245.299C14.8814 238.103 20.4327 224.239 35.5887 226.354H164.238C179.394 224.239 184.946 238.103 185.827 245.299V314.47"
                    stroke="#2A666B"
                    stroke-width="27.6719"
                  />
                  <circle
                    cx="99.913"
                    cy="143.747"
                    r="66.5278"
                    stroke="#2A666B"
                    stroke-width="27.6719"
                  />
                  <path
                    d="M263.953 214.401H214.334V74.4312H264.363C278.442 74.4312 290.562 77.2334 300.722 82.8377C310.883 88.3964 318.697 96.3927 324.164 106.827C329.678 117.261 332.434 129.745 332.434 144.28C332.434 158.86 329.678 171.39 324.164 181.869C318.697 192.349 310.837 200.391 300.585 205.995C290.379 211.599 278.168 214.401 263.953 214.401ZM243.928 189.045H262.722C271.471 189.045 278.829 187.496 284.798 184.398C290.812 181.254 295.323 176.402 298.33 169.841C301.383 163.234 302.909 154.714 302.909 144.28C302.909 133.937 301.383 125.485 298.33 118.924C295.323 112.363 290.835 107.533 284.866 104.435C278.897 101.336 271.539 99.7872 262.791 99.7872H243.928V189.045ZM393.572 74.4312V214.401H363.979V74.4312H393.572Z"
                    fill="#2A666B"
                  />
                  <line
                    x1="195.528"
                    y1="303.188"
                    x2="394.766"
                    y2="303.188"
                    stroke="#2A666B"
                    stroke-width="22.1375"
                  />
                </mask>
                <g mask="url(#mask0_425_1796)">
                  <rect
                    x="-53.5188"
                    y="3.2251"
                    width="532.408"
                    height="358.628"
                    fill="white"
                  />
                </g>
              </svg>
            </>
            <p>Created with ❤️ by #mintan</p>
            <p>© 2022 One Day Intern, All rights reserved.</p>
          </div>
          <div>
            <p>Contact us:</p>
            <a
              className={styles["footer-mail"]}
              href="mailto:onedayinternsolution@gmail.com"
            >
              <ResponseTestIcon width={25} height={25} color="white" />
              <p>onedayinternsolution@gmail.com</p>
            </a>
          </div>
        </footer>
      </main>
    </LoggedOutOnlyRoute>
  );
};

export default Home;
