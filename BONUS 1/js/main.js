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
            inputSearch: null,
            showContext: null,
            isPhoneSize: false,
            showOnlyMenu: false
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
            this.showContext = null
            if (this.isPhoneSize){
                this.showOnlyMenu = false;
            }
        },
        addMessage(index, message, status){
            if (message == null || message.replace(/\s/g,'') === ""){
                return false
            }
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
            return true
        },
        sendMessage(){
            const message = this.contacts[this.activeChat].inputText
            if (this.addMessage(this.activeChat, message, "sent")){
                // se il messaggio dell'utente passa la validazione allora inizio a inviare la risposta
                const activeChat = this.activeChat
                setTimeout(()=>{
                    this.addMessage(activeChat, this.findMessage(message), "received")
                }, 1_000)
                this.showContext = null
            }
            this.contacts[this.activeChat].inputText = "";
        },
        filterSearch(){
            if (this.inputSearch){
                return this.contacts.filter((contact) => {
                    return contact.name.toLowerCase().includes(this.inputSearch.toLowerCase());
                })
            } else {
                return this.contacts;
            }
        },
        openContextMenu(index){
            if (this.showContext === index){
                this.showContext = null
            } else {
                this.showContext = index   
            }
        },
        deleteMessage(index){
            this.contacts = this.contacts.map((contact, i) => {
                if (i !== this.activeChat){
                    // se il contatto non è quello da modificare
                    return contact
                }
                else {
                    // se è il contatto da modificare genero un nuovo contatto identico
                    const newContact = {
                        ...contact
                    }
                    newContact.messages = newContact.messages.filter((_, i)=> i !== index)
                    
                    return newContact
                }

            })
            this.showContext = null
        },
        switchView(){
            console.log("ciao")
            this.showOnlyMenu = !this.showOnlyMenu;
        },
        findMessage(message){
            // cerca un messaggio simile e restituisce la risposta
            // se non esiste risposta restituisce 'OK'
            let answer = null;
            let contContacts = 0;
            // effettuo i controlli su null con == così evito di controllare se nell assegnare un valore del messaggio sto cercando di accedere ad un messaggio che non esiste e quindi che sia undefined
            while (contContacts < this.contacts.length && answer == null){
                const messages = this.contacts[contContacts].messages
                let contMessages = 0;
                while (contMessages < messages.length && answer == null){
                    if (messages[contMessages].message.toLowerCase() === message.toLowerCase()){
                        if (messages[contMessages + 1] != undefined){
                            answer = messages[contMessages + 1].message
                        } 
                    }
                    contMessages++
                }
                contContacts++
            }
            if ( answer != null){
                return answer
            } else {
                return "ok"
            }
        }   
        
    },
    beforeMount(){
        var biggerThenPhoneMediaQuery = window.matchMedia("(min-width: 480px)")
        if (!biggerThenPhoneMediaQuery.matches){
            this.isPhoneSize = true
        } 
        biggerThenPhoneMediaQuery.addEventListener("change", () => {
            if (biggerThenPhoneMediaQuery.matches){
                this.isPhoneSize = false
            } else {
                this.isPhoneSize = true
            }
        })

        // modifico la mia lista di contatti per avere qualche valore in più
        this.contacts = this.contacts.map((contact)=>{
            return {
                ...contact,
                inputText: "",
                status: ""
            }
        })
    }

}).mount(".app")
