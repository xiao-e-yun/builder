export declare type config = {
    title?: string;
    preview?: string;
    description?: string;
    file?: string;
    tags?: tags[];
    audio?: boolean;
    type?: "Video" | "Web" | "Application" | "Scene";
    contentrating?: "Everyone" | "Questionable" | "Mature";
    visibility?: "public" | "friends-only" | "hidden" | "unlisted";
    _builder?: {
        name: "wallpaperEngineBuilder";
        author: "xiao-e-yun";
        mapping: {
            [key: string]: string;
        };
    };
};
export declare type tags = "Abstract" | "Animal" | "Anime" | "Cartoon" | "CGI" | "Cyberpunk" | "Fantasy" | "Game" | "Girls" | "Guys" | "Landscape" | "Medieval" | "Memes" | "MMD" | "Music" | "Nature" | "Pixel art" | "Relaxing" | "Retro" | "Sci-Fi" | "Sports" | "Technology" | "Television" | "Vehicle" | "Unspecified";
