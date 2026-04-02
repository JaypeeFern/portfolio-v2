import Image from 'next/image'
import { portfolioData } from '@/lib/portfolio'

export default function About() {
    const { name, role, socialLinks } = portfolioData.about
    const featuredStack = portfolioData.skills.slice(0, 4).join(" / ")

    return (
        <section id="about" className="relative min-h-[76vh] md:min-h-[82vh] flex items-center justify-center overflow-hidden pt-20 md:pt-20">
            {/* Background Decorative Elements */}
            <div className="hero-orb-primary absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="hero-orb-secondary absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] -z-10" />

            <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
                {/* Column 1: Content */}
                <div className="space-y-5 md:space-y-6 animate-in fade-in slide-in-from-left duration-1000">
                    <div className="space-y-4 md:space-y-5">
                        <p className="section-label">Selected Work / {role}</p>

                        <div className="space-y-2.5">
                            <h1 className="font-display text-[2.85rem] leading-[0.98] sm:text-6xl md:text-7xl font-bold tracking-[-0.06em] text-foreground">
                                {name}
                                <span className="block text-gradient">builds full-stack web apps.</span>
                            </h1>
                            <p className="section-kicker">Based in the Philippines</p>
                        </div>
                    </div>

                    <p className="text-muted-foreground max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed">
                        I like building web apps that feel fast, simple, and reliable, with a focus on React, Next.js, and backend development.
                    </p>

                    <div className="glass inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl px-4 py-3 text-sm text-muted-foreground">
                        <span className="section-label !tracking-[0.18em]">Current Focus</span>
                        <span className="text-foreground">{featuredStack}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                        <a
                            href="#projects"
                            className="inline-flex items-center justify-center bg-primary text-primary-foreground px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold hover:opacity-90 transition-all hover:scale-[1.02] shadow-xl shadow-primary/20"
                        >
                            View My Work
                        </a>
                        <a
                            href="#experiences"
                            className="glass inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold hover:bg-accent/10 transition-all"
                        >
                            My Experience
                        </a>
                    </div>

                    <div className="flex flex-wrap gap-3 items-center pt-1 md:pt-2">
                        <div className="flex gap-4 p-2 glass rounded-full">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub Profile"
                                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                                href={socialLinks.github}
                            >
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                                </svg>
                            </a>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn Profile"
                                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                                href={socialLinks.linkedin}
                            >
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Column 2: Image */}
                <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-auto lg:h-[560px] w-full animate-in fade-in zoom-in duration-1000 delay-300">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-3xl -rotate-3 transition-transform hover:rotate-0 duration-500" />
                    <div className="relative h-full w-full rounded-3xl overflow-hidden glass border-border/70 shadow-2xl shadow-primary/10">
                        <Image
                            src="/hero-bg.png"
                            alt={`${name} - Abstract Visual`}
                            fill
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            className="object-cover transition-scale duration-700 hover:scale-105"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                        <div className="absolute left-4 top-4 sm:left-6 sm:top-6 glass rounded-full px-3 py-1.5">
                            <span className="section-label !tracking-[0.18em]">Portfolio 2026</span>
                        </div>
                        <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8">
                            <div className="glass-dark px-4 py-2 rounded-full flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-sm font-medium">{name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
