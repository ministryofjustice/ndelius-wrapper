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
            case 'viewOffenderAliases':
                window.location = '/offender_aliases?offenderId=' + eventData.data
                break
            case 'viewOffenderAddresses':
                window.location = '/offender_addresses?offenderId=' + eventData.data
                break
            case 'viewOffenderPersonalCircumstances':
                window.location = '/offender_personal_circumstances?offenderId=' + eventData.data
                break
            case 'viewOffenderRegistrations':
                window.location = '/offender_registrations?offenderId=' + eventData.data
                break
            case 'viewEvent':
                window.location = '/offender_event?offenderId=' + eventData.data.offenderId + '&eventId=' + eventData.data.eventId
                break
            case 'transferInactiveOffender':
                window.location = '/transfer_inactive_offender?offenderId=' + eventData.data
                break
            case 'documentList':
                if (window.location.href.indexOf('sfpsr') > -1)
                    window.location = '/sfpsr_list'
                else
                    window.location = '/paroleParom1Report_list'
                break
            default:
                console.log(eventData)
        }
    } else {
        console.log(event.data)

    }
}