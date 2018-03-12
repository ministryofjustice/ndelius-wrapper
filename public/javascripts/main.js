window.addEventListener("message", receiveMessage, false);

function receiveMessage(event)
{
    if (event.data.indexOf('{') === 0) {
        var eventData = JSON.parse(event.data)

        switch(eventData.action) {
            case 'addOffender':
                window.location = '/add_offender'
                break
            case 'toggleSearch':
                window.location = '/legacy_search'
                break
            case 'viewOffender':
                window.location = '/offender_details'
                break
            case 'addContact':
                window.location = '/add_contact'
                break
            default:
                console.log(eventData)
        }
    } else {
        console.log(event.data)
        window.location = '/sfpsr_list'

    }
}