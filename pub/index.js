'use strict';

const landing_page = document.querySelector('#landing-page');
const song_info = new GeneralSongInfo('Flying', 'Anathema', 'Hindsight', 'eadgbe', 4, 'c');
const song_container = document.createElement('div');
song_container.setAttribute('style', 'display: flex; justify-content: center; margin-top: 5%;');
const Am = new Chord('Am', [-1, 0, 2, 2, 1, 0]);
const Am_2 = new Chord('Am', [5, 7, 7, 5, 5, 5], {5: [1, 6]});
const Am_bass = new Chord('Am', [5, 7, 7, 5]);
const Em = new Chord('Em', [0, 2, 2, 1, 0, 0]);
const F = new Chord('F', [1, 3, 3, 2, 1, 1], {1: [1, 6]});
const G = new Chord('G', [3, 5, 5, 4, 3, 3], {3: [1, 6]});
G.add_shape([3, 2, 0, 0, 3, 3]);
const carousel_example = new LyricChordPair('Chord with multiple shapes...', G);
const four_string_example = new LyricChordPair('Bass chord', Am_bass);
const example_line_1 = new LyricChordLine([carousel_example, four_string_example]);
const popup_carousel_example = new LyricChordPair('Popup chord', Am);
example_line_1.display(song_container, false, false);

const carousel_example2 = new LyricChordPair('Chord starting at fret 5...', Am_2);
const four_string_example2= new LyricChordPair('Chord with some open strings', Em);
const example_line2 = new LyricChordLine([carousel_example2, four_string_example2]);
const example_group = new LyricChordGroup('POPUP', [example_line2]);
const song_container2 = document.createElement('div');
song_container2.setAttribute('style', 'display: flex; justify-content: center; margin-top: 5%;');
example_group.display(song_container2);
landing_page.appendChild(song_container);
landing_page.appendChild(song_container2);