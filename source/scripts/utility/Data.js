// A unit is the dimensions of a
// "tile". A frame at 640x480 is 20x15
// units, while a level is #x2 units.
export const UNIT = 32

export const INITIAL_CONTINUES = 3

export const PROTOSTAGES = [
    {
        rescues: 7,
        colors: "#8287C1 #75696D #463339 #222222 #E0F1E1".split(" "), //blue and gray
        entities: [],
    },
    {
        rescues: 5,
        colors: "#5B749E #798A5D #45532D #222222 #DFE8F0".split(" "), //blue and green
        entities: [],
    },
    {
        rescues: 7,
        colors: "#AC8A72 #73738F #3C3C61 #222222 #D6BAE2".split(" "), //brown and blue
        entities: [],
    },
    {
        rescues: 9,
        colors: "#534873 #798BA1 #3D464F #222222 #E29AA8".split(" "), //purple and blue
        entities: [],
    },
    {
        rescues: 11,
        colors: "#5A3F80 #92869E #57395B #222222".split(" "), //purple and purple
        entities: [],
    },
    {
        rescues: 13,
        colors: "#46303D #6D5E65 #AFAF93 #222222 #A5787B".split(" "), //maroon and green
        entities: [],
    },
    {
        rescues: 15,
        colors: "#E7AC80 #8C715C #471F41 #222222 #EEE2F0".split(" "), //yellow and red
        entities: [],
    },
    {
        rescues: 17,
        colors: "#8AAB80 #48402B #2F271C #222222".split(" "), //green and brown
        entities: [],
    },
    {
        rescues: 19,
        colors: "#C4F776 #80B080 #425A44 #222222".split(" "), //green and green
        entities: [],
    },
]
