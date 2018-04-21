
DOWN.getChunk = function() {
    var chunk = maps[Math.floor(Math.random() * maps.length)];

    if (Math.random() < 0.5) chunk.forEach(c => c.reverse());

    return chunk;
};

DOWN.addStartArea = function() {
    DOWN.arrayToWorldObjects(startArea, 0);
};

DOWN.addFourNewBlocksFromPresets = function() {
    
    var newRows = [Constants.PlayArea.Width];

    for (var j=0; j!=8; ++j) {
        newRows[j] = [];
        for (var i=0; i!=Constants.PlayArea.Width; ++i) {
            newRows[j][i] = -1;
        }
    }

    for (var chunk = 0; chunk != 4; ++chunk) {
        var xOffset = chunk * 7;
        var randomChunk = DOWN.getChunk();
    
        for (var i=0; i!=8; ++i) for (var j=0; j!=8; ++j) {
            if (newRows[j][i + xOffset] !== 0) { // Don't overwrite open space with walls
                newRows[j][i + xOffset] = randomChunk[j][i];
            }
            if ((i + xOffset)===0 || (i + xOffset)===Constants.PlayArea.Width-1) {
                newRows[j][i + xOffset] = 1; // Ensure edges always solid
            } 
        }
    }

    DOWN.arrayToWorldObjects(newRows, DOWN.mapGrid.length);
};

// Convert 2d array of numbers to appropriately positioned block and enemy objects
DOWN.arrayToWorldObjects = function(arr, yOffset) {

    // add arr.length new arrays to the tile map
    for (var j=0; j!=arr.length; ++j) {
        DOWN.mapGrid[j + yOffset] = [];
    }

    // add appropriate blocks to the mapGrid and enemies to the enemy array
    for (var j=0; j!=arr.length; ++j) {
        /*
         * Certain enemy traps can only be added once the complete row of blocks has been populated, as they 
         * need to assess the state of the whole row in order to determine appropriate switch and trap placement.
         * Adding them to this array means their creation will be deferred until the row is otherwise complete.
         */
        var do_later = [];

        for (var i=0; i!=Constants.PlayArea.Width; ++i) {

            var gy = j + yOffset;
            var gx = i;

            var x = gx * Constants.BlockSize;
            var y = gy * Constants.BlockSize;

            var blockType = arr[j][i];

            // Block types
            if (blockType <= 5) { // this is a bit clumsy
                DOWN.mapGrid[gy][gx] = new block(x, y, blockType);
            } else if (blockType === Constants.TileTypes.CrumbleBlock) {
                DOWN.mapGrid[gy][gx] = new crumble_block(x, y, blockType);
            }

            // Enemy and trap types
            if (blockType === Constants.TileTypes.EnemySkull) {
                this.enemies.push(new skull(x, y));
            } else if (blockType === Constants.TileTypes.EnemySpikes) {
                this.enemies.push(new spike(x, y));
            } else if (blockType === Constants.TileTypes.BlockSpinner) {
                DOWN.mapGrid[gy][gx] = new spinner_block(x, y, blockType);
            } else if (blockType === Constants.TileTypes.EnemyFallingBlockTrapSwitch) {
                DOWN.mapGrid[gy][gx] = new block(x, y, 0);
                DOWN.enemies.push(new falling_block_switch(x, y));
            } else if (blockType === Constants.TileTypes.EnemyArrowTrapSwitch) {
                DOWN.mapGrid[gy][gx] = new block(x, y, 0);
                do_later.push({gx: gx, gy: gy, d: Constants.TileTypes.EnemyArrowTrapSwitch});
            }
        }

        do_later.forEach(i => {
            if (i.d === Constants.TileTypes.EnemyArrowTrapSwitch) {
                DOWN.enemies.push(new arrow_switch(i.gx * Constants.BlockSize, i.gy * Constants.BlockSize));
            }
        });
    }
};
