"use client"
import Lottie from "lottie-react";
import animationData from "@/components/lotties/article.json";
export default function LottieHomePage() {
    return (
        <>
            <div className="hidden md:block">
                <Lottie
                    animationData={animationData}
                    loop={true}
                    className="w-[500px] h-[400px] rounded-lg"
                />
            </div>
        </>
    )
}

