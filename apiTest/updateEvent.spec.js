const request = require('supertest')(`${process.env.BASE_URL}`)
const { eventPayload } = require('./fixtures/createFile')
const organtinzationId = process.env.ORGANIZATION_ID
let payload;
describe('create event', function () {
    it('should be able to verify if the event was created', async () => {
        let eventId

        //creating an event
        const eventName = `Dance show- ${Math.floor(Math.random() * 1000)}`;
        payload = JSON.parse(JSON.stringify(eventPayload))
        payload.event.name.html = eventName
        const response = await request
            .post(`organizations/${organtinzationId}/events/`)
            .set({

                Authorization: `Bearer ${process.env.TOKEN}`,
                accept: 'application/json'
            })
            .send(payload)
        
        //savig event id to pass it into request body to update event
        eventId = response.body.id
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
        
       //updating the event created above 
        const updateEventResponse = await request
            .post(`events/${eventId}/`)
            .set({
                Authorization: `Bearer ${process.env.TOKEN}`,
                Accept: `application/json`
            })
            .query({
                "event.summary": "Dance your heart out",
                "event.currency": "EUR"})
        expect(updateEventResponse.statusCode).toBe(200)
        expect(updateEventResponse.body.summary).toBe("Dance your heart out")
        expect(updateEventResponse.body.currency).toBe("EUR")
    });
});


//The above it block is just one test case, further API test cases can be written around this as follows
// updating capacity, start and end time 
