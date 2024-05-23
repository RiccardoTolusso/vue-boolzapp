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
            inputTexts: [],
            inputSearch: null
        }
    },
    methods:{
        getLastMessage(index){
            return this.contacts[index].messages.at(-1);
        },
        getDateFromString(dateString){
            const date = DateTime.fromFormat(dateString, "dd/MM/yyyy HH:mm:ss", {locale:"it"})
            return date;
        },
        dateToTime(date){
            return date.toLocaleString(DateTime.TIME_24_SIMPLE)
        },
        getTimeFromLastMessage(index){
            return this.dateToTime( this.getDateFromString( this.getLastMessage(index).date ) )
        },
        changeActive(newIndex){
            this.activeChat = newIndex;
        },
        addMessage(index, message, status){
            // dato l'indice corrispondente al contatto e un messaggio aggiunge il messaggio alla lista dei messaggi
            this.contacts = this.contacts.map((contact, i) => {
                if (i !== index){
                    // se il contatto non è quello da modificare
                    return contact
                }
                else {
                    // se è il contatto da modificare genero un nuovo contatto identico
                    const newContact = {
                        ...contact
                    }
                    newContact.messages.push(
                        {
                            date: DateTime.now().toFormat("dd/MM/yyyy HH:mm:ss"),
                            message: message,
                            status: status
                        }
                    )
                    return newContact
                }

            })
        },
        sendMessage(){
            this.addMessage(this.activeChat, this.inputTexts[this.activeChat], "sent")
            this.inputTexts[this.activeChat] = null;
            const activeChat = this.activeChat
            setTimeout(()=>{
                this.addMessage(activeChat, "ok", "received")
            }, 1_000)
            console.log("qua")
        },
        filterSearch(){
            if (this.inputSearch){
                return this.contacts.filter((contact) => {
                    return contact.name.toLowerCase().includes(this.inputSearch.toLowerCase());
                })
            } else {
                return this.contacts;
            }
        }   
    },
    onBeforeMount(){
        console.log("ciaooo")
    }
}).mount(".app")