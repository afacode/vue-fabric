
const fabricObj = {
    state: {
        canvas: {},
        optionSelect: false,
        cutSelect: false,
        unclock: false,
        _clipboard: {},
        forWrodBoxShow:false,
        jigsawIsOpen:true,
        currentNav:'',
        isEditor:false,
        config:{},

    },

    mutations: {
        setCanvas: (state, data) => {
            state.canvas = data;
        },
        setOptionSelect: (state, bool) => {
            state.optionSelect = bool;
        },
        setCutSelect: (state, bool) => {
            state.cutSelect = bool;
        },
        setUnclock: (state, bool) => {
            state.unclock = bool;
        },
        setClipboard: (state, data) => {
            state._clipboard = data;
        },
        setForwordBox:(state,bool )=>{
            state.forWrodBoxShow= bool;
        },
        setJigsaw:(state,bool)=>{
            state.jigsawIsOpen=bool;
        },
        setCurrentNav:(state,data)=>{
            state.currentNav=data;
        },
        setEdit:(state,bool)=>{
            state.isEditor=bool;
        },
        setHistory:(state,data)=>{
            state.config=data
        }
      

    }
};

export default fabricObj;
