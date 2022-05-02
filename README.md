# js-library-momajjed
Heroku app link for the landing page: <a href="https://peaceful-river-42856.herokuapp.com/">https://peaceful-river-42856.herokuapp.com/</a>

Link to the documentation: <a href="https://peaceful-river-42856.herokuapp.com/docs/index.html">https://peaceful-river-42856.herokuapp.com/docs/index.html</a>

# Getting Started
## Setup
### Static Download
Download the following source code files to your project's directory:
<ul>
    <li>Library JavaScript file: <a href="https://github.com/csc309-winter-2022/js-library-momajjed/blob/main/pub/js/lyrichord.js"><code>lyrichord.js</code></a></li>
    <li>Library CSS file: <a href="https://github.com/csc309-winter-2022/js-library-momajjed/blob/main/pub/css/lyrichord.css"><code>lyrichord.css</code></a></li>
</ul>

### Include
Include the following scripts on your webpage (in the same order):
```html
<link rel="stylesheet" type="text/css" href="[path to the directory in which you put the library CSS source code]/lyrichord.css">
<script defer src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script defer type="text/javascript" src='[path to the directory in which you put the library JavaScript source code]/lyrichord.js'></script>
```
## How To Use
```js
// Create a general song info instance
const song_info = new GeneralSongInfo('Knockin On Heaven\'s Door', 'Bob Dylan', 'The Essential Bob Dylan');
// Create the DOM element you want the song sheet to be displayed in
const song_container = document.createElement('div');
// Make the chords of the song.
const G = new Chord('G', [3, 2, 0, 0, 0, 3]);
G.add_shape([3, 5, 5, 4, 3, 3], {3: [1, 6]});
const D = new Chord('D', [-1, -1, 0, 2, 3, 2]);
const Am7 = new Chord('Am7', [-1, 0, 2, 0, 1, 0]);
const C = new Chord('Am7', [-1, 3, 2, 0, 1, 0]);
// Create a chord group
// ** Note that in each LyricChordPair instance, the chord is to be played together with the text counterpart.
const verse = new LyricChordGroup(
    'VERSE',
    [new LyricChordLine(
        [new LyricChordPair('Mama take', G),
         new LyricChordPair('this badge off', D),
         new LyricChordPair('of me', Am7)]),
     new LyricChordLine(
        [new LyricChordPair('I can\'t', G),
        new LyricChordPair('use it', D),
        new LyricChordPair('anymore...', D)])
    ]
)
// Create a song content instance
const content = new SongContent([verse]);
// Create the song sheet instance
const song = new SongSheet(song_info, content);
// Display the song sheet inside the container created above
song.display(song_container);
// Optional: add the container to the body of DOM
const body = document.querySelector('body');
body.appendChild(song_container)
```

Link to the documentation: <a href="https://peaceful-river-42856.herokuapp.com/docs/index.html">https://peaceful-river-42856.herokuapp.com/docs/index.html</a>
# <a href="https://peaceful-river-42856.herokuapp.com/docs/index.html">Documentation</a>
<!-- toc -->

- [Classes](#classes)
- [GeneralSongInfo](#generalsonginfo)
- [Chord](#chord)
- [LyricChordPair](#lyricchordpair)
- [LyricChordLine](#lyricchordline)
- [LyricChordGroup](#lyricchordgroup)
- [SongContent](#songcontent)
- [SongSheet](#songsheet)

<!-- tocstop -->

<!-- api -->

### Classes

<dl>
<dt><a href="#GeneralSongInfo">GeneralSongInfo</a></dt>
<dd><p>Class representing the general song info.</p>
</dd>
<dt><a href="#Chord">Chord</a></dt>
<dd><p>Class representing a Chord object.</p>
</dd>
<dt><a href="#LyricChordPair">LyricChordPair</a></dt>
<dd><p>Class representing the lyric-chord pair objects of the song sheet. In terms of representation, the chord part in the pair is to be played together with the text part.</p>
</dd>
<dt><a href="#LyricChordLine">LyricChordLine</a></dt>
<dd><p>Class representing a line of lyric-chord pairs.</p>
</dd>
<dt><a href="#LyricChordGroup">LyricChordGroup</a></dt>
<dd><p>Class representing a group of lyric-chord lines.</p>
</dd>
<dt><a href="#SongContent">SongContent</a></dt>
<dd><p>Class representing the song content portion of the song sheet (lyrics and chords).</p>
</dd>
<dt><a href="#SongSheet">SongSheet</a></dt>
<dd><p>Class representing the song sheet object.</p>
</dd>
</dl>

<a name="GeneralSongInfo"></a>

### GeneralSongInfo
Class representing the general song info.

**Kind**: global class  

* [GeneralSongInfo](#GeneralSongInfo)
    * [new GeneralSongInfo([name], [artist], [album], [tuning], [capo], [key], [instrument])](#new_GeneralSongInfo_new)
    * [.display([container])](#GeneralSongInfo+display)

<a name="new_GeneralSongInfo_new"></a>

#### new GeneralSongInfo([name], [artist], [album], [tuning], [capo], [key], [instrument])
Create a general song info section.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [name] | <code>String</code> |  | The name of the song. |
| [artist] | <code>String</code> |  | The name of the song. |
| [album] | <code>String</code> |  | The album name of the song. |
| [tuning] | <code>String</code> | <code>&#x27;eadgbe&#x27;</code> | The tuning of the song. |
| [capo] | <code>Number</code> | <code>0</code> | The fret number to put the capo on. |
| [key] | <code>String</code> |  | The key of the song. |
| [instrument] | <code>String</code> | <code>&#x27;Guitar&#x27;</code> | The string instrument name of the music sheet chords (e.g. `'Guitar'`, `'Bass'`, `'Ukulele'`). |

<a name="GeneralSongInfo+display"></a>

#### generalSongInfo.display([container])
Display general song info on DOM.

**Kind**: instance method of [<code>GeneralSongInfo</code>](#GeneralSongInfo)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [container] | <code>Element</code> | <code>document.querySelector(&#x27;body&#x27;)</code> | The element object to put the display element in. |

<a name="Chord"></a>

### Chord
Class representing a Chord object.

**Kind**: global class  

* [Chord](#Chord)
    * [new Chord([name], fret_nums, [barres], [display_in_popup])](#new_Chord_new)
    * [.add_shape(fret_nums, [barres])](#Chord+add_shape)
    * [.display([container], [chords_section], [popup])](#Chord+display)

<a name="new_Chord_new"></a>

#### new Chord([name], fret_nums, [barres], [display_in_popup])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [name] | <code>String</code> |  | The name of the chord. |
| fret_nums | <code>Array.&lt;Number&gt;</code> |  | The fret number representation of the primary shape of 6hechord, i.e. `n_i` represents which fret to hold for string `i`.<ul><li>`n_i = 0` represents open string.</li><li>`n_i = -1` represents mute string.</li><li>`n_i > 0` represents fret number to hold on string `i`.</li><li><strong>`fret_nums.length` = number of strings on corresponding instrument</strong></li>/ul> |
| [barres] | <code>Object.&lt;Number, Array.&lt;Number&gt;&gt;</code> |  | The barres on the primary shape of the chord with the key as the fret number and the value array as `[start_string , end_string]`.<ul><li>starting form the most top string on instrument (1) to the most bottom string (this.fret_nums.length)</li><li>where `start_string > 0` and `end_string > start_string`<br/>and `end_string <= fret_nums.length`</li><li>e.g. `{5: [2, 4]}` represents a barre on fret 5 covering strings #2 to #4.</li></ul> |
| [display_in_popup] | <code>Boolean</code> | <code>true</code> | Boolean representing the initial indication of whether the chord should be displayed as popup. |

<a name="Chord+add_shape"></a>

#### chord.add\_shape(fret_nums, [barres])
Add additional chord shape to a `Chord` to display on pages of chord's carousel.

**Kind**: instance method of [<code>Chord</code>](#Chord)  

| Param | Type | Description |
| --- | --- | --- |
| fret_nums | <code>Array.&lt;Number&gt;</code> | The fret number representation of the chord, i.e. `n_i` represents which fret to hold for string `i`.<ul><li>`n_i = 0` represents open string.</li><li>`n_i = -1` represents mute string.</li><li>`n_i > 0` represents fret number to hold on string `i`.</li><li><strong>`fret_nums.length` = number of strings on corresponding instrument</strong></li></ul> |
| [barres] | <code>Object.&lt;Number, Array.&lt;Number&gt;&gt;</code> | The barres on the chord with the key as the fret number and the value array as<br/>`[start_string , end_string]`.<ul><li>starting form the most top string on instrument (1) to the most bottom string (this.fret_nums.length)</li><li>where `start_string > 0` and `end_string > start_string`<br/>and `end_string <= fret_nums.length`</li><li>e.g. `{5: [2, 4]}` represents a barre on fret 5 covering strings #2 to #4.</li></ul> |

<a name="Chord+display"></a>

#### chord.display([container], [chords_section], [popup])
Display chord on DOM.

**Kind**: instance method of [<code>Chord</code>](#Chord)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [container] | <code>Element</code> | <code>document.querySelector(&#x27;body&#x27;)</code> | The element object to put the display element in. |
| [chords_section] | <code>Boolean</code> | <code>false</code> | Boolean indicating whether it is being displayed on the song chords section of the song sheet (since they are formatted differently) |
| [popup] | <code>Boolean</code> |  | Boolean indicating whether the chord should be displayed as a popup. |

<a name="LyricChordPair"></a>

### LyricChordPair
Class representing the lyric-chord pair objects of the song sheet. In terms of representation, the chord part in the pair is to be played together with the text part.

**Kind**: global class  

* [LyricChordPair](#LyricChordPair)
    * [new LyricChordPair([text], [chord])](#new_LyricChordPair_new)
    * [.display([container], [format_single_chord], [popup])](#LyricChordPair+display)

<a name="new_LyricChordPair_new"></a>

#### new LyricChordPair([text], [chord])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [text] | <code>String</code> | | The lyrical part of the pair. |
| [chord] | [<code>Chord</code>](#Chord) | | The chord part of the pair. |

<a name="LyricChordPair+display"></a>

#### lyricChordPair.display([container], [format_single_chord], [popup])
Display the lyric-chord pair on DOM.

**Kind**: instance method of [<code>LyricChordPair</code>](#LyricChordPair)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [container] | <code>Element</code> | <code>document.querySelector(&#x27;body&#x27;)</code> | The element object to put the display element in. |
| [format_single_chord] | <code>Boolean</code> | <code>false</code> | Format the corresponding chord's display on the song sheet.<br/>e.g. for instrumental portion of a non instrumental song |
| [popup] | <code>Boolean</code> | <code>false</code> | Boolean indicating whether the corresponding chord should be displayed as popup. |

<a name="LyricChordLine"></a>

### LyricChordLine
Class representing a line of lyric-chord pairs.

**Kind**: global class  

* [LyricChordLine](#LyricChordLine)
    * [new LyricChordLine(pairs)](#new_LyricChordLine_new)
    * [.addPair(pair)](#LyricChordLine+addPair)
    * [.display([container], [popup])](#LyricChordLine+display)

<a name="new_LyricChordLine_new"></a>

#### new LyricChordLine(pairs)

| Param | Type | Description |
| --- | --- | --- |
| pairs | [<code>Array.&lt;LyricChordPair&gt;</code>](#LyricChordPair) | Array of lyric-chord pairs to be displayed togehter on the line. |

<a name="LyricChordLine+addPair"></a>

#### lyricChordLine.addPair(pair)
Add a lyric-chord pair to the line object.

**Kind**: instance method of [<code>LyricChordLine</code>](#LyricChordLine)  

| Param | Type | Description |
| --- | --- | --- |
| pair | [<code>LyricChordPair</code>](#LyricChordPair) | The lyric-chord pair to be added. |

<a name="LyricChordLine+display"></a>

#### lyricChordLine.display([container], [popup])
Display lyric-chord line on DOM.

**Kind**: instance method of [<code>LyricChordLine</code>](#LyricChordLine)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [container] | <code>Element</code> | <code>document.querySelector(&#x27;body&#x27;)</code> | The element object to put the display element in. |
| [popup] | <code>Boolean</code> | | Boolean indicating whether the chords of the lyric-chord pairs on the line should be displayed as a popup. |

<a name="LyricChordGroup"></a>

### LyricChordGroup
Class representing a group of lyric-chord lines.

**Kind**: global class  

* [LyricChordGroup](#LyricChordGroup)
    * [new LyricChordGroup([title], lines)](#new_LyricChordGroup_new)
    * [.addLine(line)](#LyricChordGroup+addLine)
    * [.display([container], [popup])](#LyricChordGroup+display)

<a name="new_LyricChordGroup_new"></a>

#### new LyricChordGroup([title], lines)

| Param | Type | Description |
| --- | --- | --- |
| [title] | <code>String</code> | Name of the lyric-chord group (e.g. `'CHORUS'`, `'SOLO'`, etc.) |
| lines | [<code>Array.&lt;LyricChordLine&gt;</code>](#LyricChordLine) | Array of lyric-chord lined to be displayed togehter in the group. |

<a name="LyricChordGroup+addLine"></a>

#### lyricChordGroup.addLine(line)
Add a lyric-chord line to the line object.

**Kind**: instance method of [<code>LyricChordGroup</code>](#LyricChordGroup)  

| Param | Type | Description |
| --- | --- | --- |
| line | [<code>LyricChordLine</code>](#LyricChordLine) | The lyric-chord line to be added. |

<a name="LyricChordGroup+display"></a>

#### lyricChordGroup.display([container], [popup])
Display lyric-chord group on DOM.

**Kind**: instance method of [<code>LyricChordGroup</code>](#LyricChordGroup)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [container] | <code>Element</code> | <code>document.querySelector(&#x27;body&#x27;)</code> | The element object to put the display element in. |
| [popup] | <code>Boolean</code> | | Boolean indicating whether the chords of the lyric-chord pairs on the lines of the group should be displayed as a popup. |

<a name="SongContent"></a>

### SongContent
Class representing the song content portion of the song sheet (lyrics and chords).

**Kind**: global class  

* [SongContent](#SongContent)
    * [new SongContent(groups)](#new_SongContent_new)
    * [.generateDOM([popup])](#SongContent+generateDOM) ⇒ <code>Element</code>
    * [.display([container], [popup])](#SongContent+display)

<a name="new_SongContent_new"></a>

#### new SongContent(groups)

| Param | Type | Description |
| --- | --- | --- |
| groups | [<code>Array.&lt;LyricChordGroup&gt;</code>](#LyricChordGroup) | Array of lyric-chord groups of the song content. |

<a name="SongContent+generateDOM"></a>

#### songContent.generateDOM([popup]) ⇒ <code>Element</code>
Generates and returns the DOM element of the song content.

**Kind**: instance method of [<code>SongContent</code>](#SongContent)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [popup] | <code>Boolean</code> | | Boolean indicating whether the chords in the song content should be displayed as popups. |

<a name="SongContent+display"></a>

#### songContent.display([container], [popup])
Display song content on DOM.

**Kind**: instance method of [<code>SongContent</code>](#SongContent)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [container] | <code>Element</code> | <code>document.querySelector(&#x27;body&#x27;)</code> | The element object to put the display element in. |
| [popup] | <code>Boolean</code> | | Boolean indicating whether the chords of the song content should be displayed as a popup. |

<a name="SongSheet"></a>

### SongSheet
Class representing the song sheet object.

**Kind**: global class  

* [SongSheet](#SongSheet)
    * [new SongSheet(song_info, song_content, [display_all_chords], [popup_format])](#new_SongSheet_new)
    * [.display_chords()](#SongSheet+display_chords) ⇒ <code>Element</code> \| <code>null</code>
    * [.display([container])](#SongSheet+display)

<a name="new_SongSheet_new"></a>

#### new SongSheet(song_info, song_content, [display_all_chords], [popup_format])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| song_info | [<code>GeneralSongInfo</code>](#GeneralSongInfo) | | General song info part of the song. |
| song_content | [<code>SongContent</code>](#SongContent) | | Song content part of the song. |
| [display_all_chords] | <code>Boolean</code> | <code>true</code> | Option to have a section on the song sheet to display all chords together. |
| [popup_format] | <code>Boolean</code> | <code>true</code> | Boolean indicating whether the chords of the song should be displayed as popups. |

<a name="SongSheet+display_chords"></a>

#### songSheet.display\_chords() ⇒ <code>Element</code> \| <code>null</code>
Returns the dom element of the chord section or null if there are no chords in the song.

**Kind**: instance method of [<code>SongSheet</code>](#SongSheet)  
<a name="SongSheet+display"></a>

#### songSheet.display([container])
Display song sheet on DOM

**Kind**: instance method of [<code>SongSheet</code>](#SongSheet)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [container] | <code>Element</code> | <code>document.querySelector(&#x27;body&#x27;)</code> | The element object to put the display element in. |


<!-- apistop -->
