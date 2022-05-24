const request = require('supertest')(`${process.env.BASE_URL}`)
const { eventPayload } = require('./fixtures/createFile')
const { updateEventPayload } = require('./fixtures/updateEvent')
const organtinzationId = process.env.ORGANIZATION_ID
let payload;
jest.setTimeout(30000)
describe('create event', function () {
    it('should be able to verify if the event was created', async () => {
        let eventId
        const eventName = "My second event"
        payload = JSON.parse(JSON.stringify(eventPayload))
        updateEventpayload = JSON.parse(JSON.stringify(updateEventPayload))
        //console.log(payload)
        payload.event.name.html = eventName
        //delete payload.event.name.html
        const response = await request
            .post(`organizations/${organtinzationId}/events/`)
            .set({

                Authorization: `Bearer ${process.env.TOKEN}`,
                accept: 'application/json'
            })
            .send(payload)
        console.log(response.body)
        eventId = response.body.id
        console.log(eventId)
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            name: { text: eventName, html: eventName },

            description: { text: null, html: null },
            url: expect.any(String),
            start: {
                timezone: 'America/Los_Angeles',
                local: '2022-08-07T19:00:00',
                utc: '2022-08-08T02:00:00Z'
            },
            end: {
                timezone: 'America/Los_Angeles',
                local: '2022-12-11T21:00:00',
                utc: '2022-12-12T05:00:00Z'
            },
            organization_id: organtinzationId,
            created: expect.stringMatching('2022-05'),
            changed: expect.stringMatching('2022-05'),
            capacity: 0,
            capacity_is_custom: false,
            status: 'draft',
            currency: 'USD',
            listed: true,
            shareable: false,
            invite_only: false,
            online_event: false,
            show_remaining: false,
            tx_time_limit: 1200,
            hide_start_date: false,
            hide_end_date: false,
            locale: 'en_US',
            is_locked: false,
            privacy_setting: 'unlocked',
            is_series: false,
            is_series_parent: false,
            inventory_type: 'limited',
            is_reserved_seating: false,
            show_pick_a_seat: false,
            show_seatmap_thumbnail: false,
            show_colors_in_seatmap_thumbnail: false,
            source: 'api',
            is_free: true,
            version: null,
            summary: null,
            facebook_event_id: null,
            logo_id: null,
            organizer_id: '47526068893',
            venue_id: null,
            category_id: null,
            subcategory_id: null,
            format_id: null,
            id: expect.any(String),
            resource_uri: expect.any(String),
            is_externally_ticketed: false,
            logo: null
        })
        
        console.log(organtinzationId)
        const updateEventResponse = await request
            .post(`events/${eventId}/`)
            .set({
                Authorization: `Bearer ${process.env.TOKEN}`,
                Accept: `application/json`
            })
            .query({ "event.name.html": 'Test1' })
        expect(updateEventResponse.statusCode).toBe(200)
        console.log(updateEventResponse.body)
    });
});

// curl--location--request POST 'eventbrite.com' \
// --header 'Authorization: Bearer 3NXP6GG3PP7JSTHJXMX4' \
// --header 'Content-Type: text/plain' \
// --data - raw 'curl -X POST   https://www.eventbriteapi.com/v3/organizations/977189949183/events/347651694577   -H '\''Authorization: Bearer 3NXP6GG3PP7JSTHJXMX4'\'' - H "Accept: application/json"
//     - d '\''{
//     "event": {
//         "capacity": 200
//     }
// } '\'''