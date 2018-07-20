window.addEventListener("message", receiveMessage, false);

function receiveMessage(event)
{
    if (event.data.indexOf('{') === 0) {
        var eventData = JSON.parse(event.data)
        console.log(event.data)

        switch(eventData.action) {
            case 'addOffender':
                window.location = '/add_offender'
                break
            case 'toggleSearch':
                window.location = '/legacy_search'
                break
            case 'viewOffender':
                window.location = '/offender_details?offenderId=' + eventData.data
                break
            case 'addContact':
                window.location = '/add_contact?offenderId=' + eventData.data
                break
            case 'documentList':
                window.location = '/sfpsr_list'
                break
            default:
                console.log(eventData)
        }
    } else {
        console.log(event.data)

    }
}