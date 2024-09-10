
// import React from 'react';

// const YouTubeVideo = ({ videoUrl }) => {
//     const videoId = videoUrl?.split('v=')[1];

//     return (
//         <div className="flex justify-center items-center">
//             <div className="relative overflow-hidden w-full pb-[56.25%]">
//                 <iframe
//                     width="100%"
//                     height="315"
//                     className="absolute top-0 left-0 w-full h-full"
//                     src={`https://www.youtube.com/embed/${videoId}?showinfo=0&modestbranding=1&rel=0&mute=0`}
//                     title="YouTube video player"
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                     allowFullScreen
//                 ></iframe>
//             </div>
//         </div>
//     );
// };



const YouTubeVideo = ({ videoUrl }) => {
    const getYouTubeEmbedUrl = (url) => {
        const videoId = url.split('v=')[1];
        if (!videoId) return null;
        return `https://www.youtube.com/embed/${videoId}`;
    };

    const embedUrl = getYouTubeEmbedUrl(videoUrl);

    if (!embedUrl) {
        return <p>Invalid YouTube URL</p>;
    }

    return (
        <div className="youtube-video-container">
            <iframe
                width="100%"
                height="375"
                src={embedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default YouTubeVideo;


