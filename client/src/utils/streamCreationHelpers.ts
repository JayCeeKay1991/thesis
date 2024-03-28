import { ChannelType } from "@/types/Channel";
import { MixTape } from "@/types/MixTape";
import { Dispatch, SetStateAction } from "react";
import { Howl } from "howler";


// main generate streamfunction
export async function generateStream(channel: ChannelType,
    setStreamIndex: Dispatch<SetStateAction<number>>,
    streamIndex: number) {
    // extract urls
    const urls = extractStreamUrls(channel.mixTapes);
    // generate howls and return a promise
    return generateHowlsfromUrls(urls,setStreamIndex, streamIndex);
}

// extract the urls from the mixtapes and returns as array
function extractStreamUrls(mixTapes: MixTape[]) {
    const urls = mixTapes.map((tape) => tape.url);
    return urls;
}

// generate howl instances from urls
function generateHowlsfromUrls(
    urls: string[],
    setStreamIndex: Dispatch<SetStateAction<number>>,
    streamIndex: number): Promise<Howl[]> {
    // create an array to store promises for each Howl
    const howlPromises: Promise<Howl>[] = [];

    // map through urls and create promises for each Howl
    urls.forEach((url) => {
        const promise = new Promise<Howl>((resolve) => {
            const howl = new Howl({
                src: [url],
                html5: true,
                preload: true,
                onload: function (this: Howl) {
                    // Resolve the promise when the Howl is loaded
                    resolve(howl);
                },
                onend: function (this: Howl) {
                    let nextIndex = (streamIndex + 1) % urls.length;
                    setStreamIndex(nextIndex);
                }, 
            });
        });
        howlPromises.push(promise);
    });

    // return a promise all that resolves when all Howls are loaded
    return Promise.all(howlPromises);
}



