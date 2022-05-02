'use strict';

const song_info = new GeneralSongInfo('Flying', 'Anathema', 'Hindsight', 'eadgbe', 4, 'c');
const song_container = document.createElement('div');
song_container.setAttribute('style', 'display: flex; justify-content: center;')
const Am = new Chord('Am', [-1, 0, 2, 2, 1, 0]);
const Am_2 = new Chord('Am', [5, 7, 7, 5, 5, 5], {5: [1, 6]});
const Em = new Chord('Em', [0, 2, 2, 1, 0, 0]);
const F = new Chord('F', [1, 3, 3, 2, 1, 1], {1: [1, 6]});
const G = new Chord('G', [3, 2, 0, 0, 0, 3]);
G.add_shape([3, 2, 0, 0, 3, 3]);
const verse1 = new LyricChordGroup(
    'VERSE',
    [new LyricChordLine(
        [new LyricChordPair('Started a search to no avail a light that shines behind the veil,', Am),
         new LyricChordPair('trying to find it', Em)]),
     new LyricChordLine(
        [new LyricChordPair('And all around us everywhere is all that we could ever share,', Am),
        new LyricChordPair('if only we could see it', Em)]),
     new LyricChordLine(
        [new LyricChordPair('Believe there\'s true thoughts', Am),
         new LyricChordPair('beyond me', Em)]),
     new LyricChordLine(
        [new LyricChordPair('Life ever changing weaving', Am),
         new LyricChordPair('destiny', Em)])
    ]
)
const chorus1 = new LyricChordGroup(
    'CHORUS',
    [new LyricChordLine(
        [new LyricChordPair('It feels like i\'m'),
         new LyricChordPair('flying,', F),
         new LyricChordPair('above you', Am_2),
         new LyricChordPair(null, Em)]),
     new LyricChordLine(
        [new LyricChordPair('Dream that i\'m '),
         new LyricChordPair('dying, to', F),
         new LyricChordPair('find the', Am_2),
         new LyricChordPair('truth', Em)]),
     new LyricChordLine(
        [new LyricChordPair('Seems like you\'re'),
        new LyricChordPair('trying, to', F),
        new LyricChordPair('bring me down', G)]),
     new LyricChordLine(
        [new LyricChordPair('Back down to'),
         new LyricChordPair('earth', F),
         new LyricChordPair('back down to'),
         new LyricChordPair('earth', Em)])
    ]
)
const verse2 = new LyricChordGroup(
    'VERSE',
    [new LyricChordLine(
        [new LyricChordPair('Layers of dust and yesterdays shadows fading in the haze,', Am),
         new LyricChordPair('what i couldn\'t say', Em)]),
     new LyricChordLine(
        [new LyricChordPair('Though i said my hands were tied time i changed and now i find,', Am),
        new LyricChordPair('free for the first time', Em)]),
     new LyricChordLine(
        [new LyricChordPair('Feel so close to', Am),
         new LyricChordPair('everything now', Em)]),
     new LyricChordLine(
        [new LyricChordPair('Strange how life makes', Am),
         new LyricChordPair('sense in time', Em)])
    ]
)

const chorus2 = new LyricChordGroup(
    'CHORUS',
    [new LyricChordLine(
        [new LyricChordPair('It feels like i\'m'),
         new LyricChordPair('flying,', F),
         new LyricChordPair('above you', Am_2),
         new LyricChordPair(null, Em)]),
     new LyricChordLine(
        [new LyricChordPair('Dream that i\'m '),
         new LyricChordPair('dying, to', F),
         new LyricChordPair('find the', Am_2),
         new LyricChordPair('truth', Em)]),
     new LyricChordLine(
        [new LyricChordPair('Seems like you\'re'),
        new LyricChordPair('trying (trying, trying, trying...), to', F),
        new LyricChordPair('bring me down', G)]),
     new LyricChordLine(
        [new LyricChordPair('Back down to'),
         new LyricChordPair('earth', F),
         new LyricChordPair('back down to'),
         new LyricChordPair('earth', G)]),
    new LyricChordLine(
        [new LyricChordPair('Back down to'),
         new LyricChordPair('earth', F),
         new LyricChordPair('back down to'),
         new LyricChordPair('earth', G),
         new LyricChordPair('BACK DOOOWN!!!', F),
        ])
    ]
)
const solo = new LyricChordGroup(
    'SOLO',
    [new LyricChordLine(
        [new LyricChordPair(null, F),
         new LyricChordPair(null, Em),
         new LyricChordPair('(x2)')]),
     new LyricChordLine(
        [new LyricChordPair(null, F),
         new LyricChordPair(null, Am),
         new LyricChordPair(null, Em),
         new LyricChordPair('(x4)')])
    ] 
)
const content = new SongContent([verse1, chorus1, verse2, chorus2, solo]);
const song = new SongSheet(song_info, content, true);
song.display(song_container);
const body = document.querySelector('body');
body.appendChild(song_container);



// Code for the example code toggle
const button = document.getElementById('code1-button');
const code = document.getElementById('code1');
button.addEventListener('click', () => {
    if (button.innerText === 'Click to hide code') {
        button.innerText = 'Click to show code';
        code.classList.remove('display-block');
        code.classList.add('display-none');
    } else if (button.innerText === 'Click to show code') {
        button.innerText = 'Click to hide code';
        code.classList.remove('display-none');
        code.classList.add('display-block');
    }
});