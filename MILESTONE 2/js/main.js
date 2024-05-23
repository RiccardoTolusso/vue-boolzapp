//IMPORTS
import contacts from "./data.js"

var DateTime = luxon.DateTime;

console.log(contacts)
// VUE
const { createApp } = Vue


createApp({
    data(){
        return {
            contacts,
            activeChat: 0,
        }
    },
    methods:{
        getLastMessage(index){
            return this.contacts[index].messages.at(-1);
        },
        getDateFromString(dateString){
            const date = DateTime.fromFormat(dateString, "dd/MM/yyyy HH:mm:ss", {locale:"it"})
            console.log(date)
            return date;
        },
        dateToTime(date){
            return date.toLocaleString(DateTime.TIME_24_SIMPLE)
        },
        getTimeFromLastMessage(index){
            return this.dateToTime( this.getDateFromString( this.getLastMessage(index).date ) )
        }
    }
}).mount(".app")