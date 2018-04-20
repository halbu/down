var maps = [
    // reference blank map chunk
    // [
    //     [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    //     [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    //     [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    //     [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    //     [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    //     [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    //     [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    //     [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    // ],
    
    [
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 8, 0, 0, 8, 0, 0, 0 ],
        [ 0, 1, 0, 0, 1, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 8, 0, 0 ],
        [ 0, 0, 0, 0, 0, 1, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    ],
    [
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 4, 0 ],
        [ 0, 6, 0, 0, 0, 6, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    ],
    [
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 3, 0, 0, 0, 0, 0 ],
        [ 0, 1, 1, 0, 0, 0, 0, 0 ],
        [ 0, 1, 1, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    ],
    [
        [ 1, 1, 0, 0, 0, 0, 1, 1 ],
        [ 1, 0, 0, 0, 0, 0, 0, 1 ],
        [ 1, 0, 0, 0, 0, 0, 0, 1 ],
        [ 1, 0, 0, 0, 0, 0, 0, 0 ],
        [ 1, 0, 0, 0, 0, 1, 1, 0 ],
        [ 1, 0, 0, 0, 0, 0, 0, 1 ],
        [ 1, 0, 0, 2, 10,0, 0, 1 ],
        [ 1, 0, 0, 1, 1, 0, 0, 1 ],
    ],
    [
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 1, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 1, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 1, 0, 0, 0, 2, 0 ],
        [ 0, 0, 0, 0, 0, 0, 1, 0 ],
        [ 0, 4, 0, 4, 0, 1, 0, 0 ],
        [ 0, 0, 0, 0, 1, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    ],
    [
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 4, 0, 0, 1, 1, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 10,0, 0, 0, 0, 0 ],
        [ 0, 0, 1, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    ],
    [
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 6, 0, 0, 0 ],
        [ 0, 6, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 5, 0, 0, 0 ],
        [ 0, 0, 0, 0, 1, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 4, 0, 0 ],
        [ 0, 0, 0, 1, 0, 0, 0, 0 ],
    ],
    [
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 1, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 4, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 7, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 1, 0, 0, 5, 5, 0, 0 ],
        [ 0, 0, 0, 1, 1, 1, 1, 0 ],
    ],
    [
        [ 1, 1, 1, 1, 1, 0, 0, 1 ],
        [ 1, 0, 0, 0, 2, 0, 0, 1 ],
        [ 1, 0, 3, 2, 1, 0, 0, 1 ],
        [ 1, 2, 1, 1, 0, 0, 0, 1 ],
        [ 1, 1, 0, 0, 0, 0, 0, 1 ],
        [ 0, 0, 0, 0, 0, 7, 0, 1 ],
        [ 0, 0, 0, 0, 0, 10,0, 1 ],
        [ 1, 1, 1, 1, 1, 1, 1, 1 ],
    ],
    [
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 1 ],
        [ 0, 0, 0, 6, 6, 6, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 5, 5, 5, 5, 5, 0 ],
        [ 0, 0, 1, 1, 1, 1, 1, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    ],
];

var startArea = [
    [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
    [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1 ],
    [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1 ],
    [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1 ],
    [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 0, 0, 0, 0, 6, 6, 6, 6, 6, 0, 0, 1 ],
    [ 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0, 1 ],
    [ 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,0, 0, 0, 0, 0, 0, 0, 1 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1 ]
];