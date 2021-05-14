const urlParams = new URLSearchParams(window.location.search);
let boardId = urlParams.get('b');
let keyId = urlParams.get('k');

let wordOptions = 'Hollywood,Well,Foot,New York,Spring,Court,Tube,Point,Tablet,Slip,Date,Drill,Lemon,Bell,Screen,Fair,Torch,State,Match,Iron,Block,France,Australia,Limousine,Stream,Glove,Nurse,Leprechaun,Play,Tooth,Arm,Bermuda,Diamond,Whale,Comic,Mammoth,Green,Pass,Missile,Paste,Drop,Pheonix,Marble,Staff,Figure,Park,Centaur,Shadow,Fish,Cotton,Egypt,Theater,Scale,Fall,Track,Force,Dinosaur,Bill,Mine,Turkey,March,Contract,Bridge,Robin,Line,Plate,Band,Fire,Bank,Boom,Cat,Shot,Suit,Chocolate,Roulette,Mercury,Moon,Net,Lawyer,Satellite,Angel,Spider,Germany,Fork,Pitch,King,Trip,Dog,Conductor,Part,Bugle,Witch,Ketchup,Press,Spine,Worm,Alps,Bond,Pan,Beijing,Racket,Cross,Seal,Aztec,Maple,Parachute,Hotel,Berry,Soldier,Ray,Post,Greece,Square,Mass,Bat,Wave,Car,Smuggler,England,Crash,Tail,Card,Horn,Capital,Fence,Deck,Buffalo,Microscope,Jet,Duck,Ring,Train,Field,Gold,Tick,Check,Queen,Strike,Kangaroo,Spike,Scientist,Engine,Shakespeare,Wind,Kid,Embassy,Robot,Note,Ground,Draft,Ham,War,Mouse,Center,Chick,China,Bolt,Spot,Piano,Pupil,Plot,Lion,Police,Head,Litter,Concert,Mug,Vacuum,Atlantis,Straw,Switch,Skyscraper,Laser,Scuba Diver,Africa,Plastic,Dwarf,Lap,Life,Honey,Horseshoe,Unicorn,Spy,Pants,Wall,Paper,Sound,Ice,Tag,Web,Fan,Orange,Temple,Canada,Scorpion,Undertaker,Mail,Europe,Soul,Apple,Pole,Tap,Mouth,Ambulance,Dress,Ice Cream,Rabbit,Buck,Agent,Sock,Nut,Boot,Ghost,Oil,Superhero,Code,Kiwi,Hospital,Saturn,Film,Button,Snowman,Helicopter,Loch Ness,Log,Princess,Time,Cook,Revolution,Shoe,Mole,Spell,Grass,Washer,Game,Beat,Hole,Horse,Pirate,Link,Dance,Fly,Pit,Server,School,Lock,Brush,Pool,Star,Jam,Organ,Berlin,Face,Luck,Amazon,Cast,Gas,Club,Sink,Water,Chair,Shark,Jupiter,Copper,Jack,Platypus,Stick,Olive,Grace,Bear,Glass,Row,Pistol,London,Rock,Van,Vet,Beach,Charge,Port,Disease,Palm,Moscow,Pin,Washington,Pyramid,Opera,Casino,Pilot,String,Night,Chest,Yard,Teacher,Pumpkin,Thief,Bark,Bug,Mint,Cycle,Telescope,Calf,Air,Box,Mount,Thumb,Antactica,Trunk,Snow,Penguin,Root,Bar,File,Hawk,Battery,Compound,Slug,Octopus,Whip,America,Ivory,Pound,Sub,Cliff,Lab,Eagle,Genious,Ship,Dice,Hood,Heart,Novel,Pipe,Himalayas,Crown,Round,India,Needle,Shop,Watch,Lead,Tie,Table,Cell,Cover,Czech,Back,Bomb,Ruler,Forest,Bottle,Space,Hook,Doctor,Ball,Bow,Degree,Rome,Plane,Giant,Nail,Dragon,Stadium,Flute,Carrot,Wake,Fighter,Model,Tokyo,Eye,Mexico,Hand,Swing,Key,Alien,Tower,Poison,Cricket,Cold,Knife,Church,Board,Cloak,Ninja,Olympus,Belt,Light,Death,Stock,Millionarie,Day,Knight,Pie,Bed,Circle,Rose,Change,Cap,Triangle';
wordOptions = wordOptions.split(',');
let keyOptions = 'blue,blue,blue,blue,blue,blue,blue,blue,red,red,red,red,red,red,red,red,assassin,bystander,bystander,bystander,bystander,bystander,bystander,bystander';
keyOptions = keyOptions.split(',');

let generateButton, generateFromSeed, generateKeyButton;

const currentUrl = window.location.href.split('?')[0];

document.addEventListener("DOMContentLoaded", function() {
    generateButton = document.getElementById('generate');
    generateButton.onclick = drawBoard;

    generateFromSeedButton = document.getElementById('generateFromSeed');
    generateFromSeedButton.onclick = () => {
        boardId = document.getElementById('userSeed').value;
        drawBoard(boardId);
    };

    generateKeyButton = document.getElementById('key');
    generateKeyButton.onclick = drawKey;

    generateKeyFromSeedButton = document.getElementById('generateKeyFromSeed');
    generateKeyFromSeedButton.onclick = () => {
        keyId = document.getElementById('keySeed').value;
        drawKey(keyId);
    };

    if (boardId) {
        drawBoard(boardId);
    }
    if (keyId) {
        drawKey(keyId);
    }
});

function fisherYates(myArray, nb_picks, seed) {
    const rng = new Math.seedrandom(seed);
    const tempArray = myArray.slice();
    for (i = tempArray.length-1; i > 1  ; i--)
    {
        var r = Math.floor(rng()*i);
        var t = tempArray[i];
        tempArray[i] = tempArray[r];
        tempArray[r] = t;
    }

    return tempArray.slice(0,nb_picks);
}

function drawBoard(newBoardId, allowCardClicks = true) {
    // reset board
    let seed = Math.ceil(Math.random() * 100000).toString();
    if (newBoardId && typeof newBoardId != 'object') {
        seed = newBoardId;
    }
    let board = document.getElementById('board');
    console.log('wipe out board');
    board.innerHTML = '';

    const boardWords = fisherYates(wordOptions, 25, seed);
    boardId = seed;
    const itemsPerRow = 5;

    let row = -1;

    let boardLayout = [];

    for (let i = 0; i < boardWords.length; i++) {
        const word = boardWords[i];
        if(i % itemsPerRow == 0) {
            row++;
            boardLayout[row] = document.createElement('tr');
        }
        let card = document.createElement('td');
        card.classList.add('cn-card');
        card.innerHTML = word;
        if (allowCardClicks) {
            card.onclick = assignCard;
            card.classList.add('cn-clickable');
        }
        
        boardLayout[row].appendChild(card);
    }

    boardLayout.forEach(row => {
        board.appendChild(row);
    });

    updateBoardLink();
}

function drawKey(newKeyId) {
    let seed = Math.ceil(Math.random() * 100000).toString();
    if (newKeyId && typeof newKeyId != 'object') {
        seed = newKeyId;
    }
    keyId = seed;
    const boardString = document.getElementById('string');
    if (boardString) {
        drawBoard(boardString.innerHTML, false);
    } else {
        drawBoard(boardId, false);
    }
    const cards = document.querySelectorAll('.cn-card');
    if (cards.length > 0) {
        let gameKey = keyOptions.slice();
        let rng = new Math.seedrandom(seed);
        if (Math.ceil(rng() * 2) == 1) {
            gameKey.push('red');
            document.getElementById('goesFirst').innerHTML = 'Red goes first.';
        } else {
            gameKey.push('blue');
            document.getElementById('goesFirst').innerHTML = 'Blue goes first.';
        }

        gameKey = fisherYates(gameKey, 25, seed);

        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.add(gameKey[i]);
        }
    }

    updateBoardLink();
}

function updateBoardLink() {
    let links = document.getElementById('links');
    links.innerHTML = '';
    
    if (boardId) {
        let boardContainer = document.createElement('p');
        boardContainer.classList.add('board-link');
        let boardLink = document.createElement('a');
        boardLink.text = `Board Only Link`;
    
        let boardUrl = currentUrl + '?';
        boardUrl += `b=${boardId}`;

        boardLink.href = boardUrl;
        boardContainer.appendChild(boardLink);
        boardContainer.innerHTML += ` (${boardId})`;
        links.appendChild(boardContainer);
    }
    if (boardId && keyId) {
        let keyContainer = document.createElement('p');
        keyContainer.classList.add(['link', 'key']);
        let keyLink = document.createElement('a');
        keyLink.text = `Board & Key Link`;
    
        let keyUrl = currentUrl + '?';
        keyUrl += `b=${boardId}&k=${keyId}`;

        keyLink.href = keyUrl;
        keyContainer.appendChild(keyLink);
        keyContainer.innerHTML += ` (Board: ${boardId}; Key: ${keyId})`;
        links.appendChild(keyContainer);
    }
}

function assignCard(event) {
    let options = ['blue', 'red', 'bystander', 'assassin'];
    let card = event.target;
    console.log('card click: ', card.classList);
    let clear = false;
    for (let i = 0; i < options.length; i++) {
        if (card.classList.contains(options[i])) {
            console.log(`\tremove ${options[i]}`);
            card.classList.remove(options[i]);
            if (i < options.length - 1) {
                card.classList.add(options[i + 1]);
            } else {
                clear = true;
            }
            console.log(`\tfinal: ${card.classList}`);
            break;
        }
    }

    if (!clear && card.classList.length == 2) {
        console.log('nothing set, setting basic.')
        card.classList.add(options[0]);
    }
}