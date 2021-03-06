var Constants = {
    BlockSize: 24,
    DeathMessageYPosition: 235,
    FatalFallVelocity: 11,
    Gravity: 0.2,
    MapChunkHeight: 8,
    MillisecondsPerFrame: 16.66,
    PauseFramesAtGameStart: 90,
    PauseFramesBeforeDeathMessage: 80,
    TextBorderPixels: 3,
    Canvas: {
        Height:         480,
        Width:          696,
    },
    Colors: {
        Lightest:       '#9bbc0f',
        Light:          '#8bac0f',
        Dark:           '#306230',
        Darkest:        '#0f380f',
        DebugRed:       '#ff0000',
        DebugMagenta:   '#ff00ff',
    },
    PlayArea: {
        Width:          29,
        Height:         20,
    },
    TileTypes: {
        Nothing:                        0,
        SolidBlock:                     1,
        BGWitheredTree:                 2,
        BGRock:                         3,
        EnemySkull:                     4,
        EnemySpikes:                    5,
        CrumbleBlock:                   6,
        BlockSpinner:                   7,
        EnemyFallingBlockTrapSwitch:    8,
        BGChain:                        9,
        EnemyArrowTrapSwitch:           10,
        EnemyArrowLauncherL:            11,
        EnemyArrowLauncherR:            12,
    }
};