module.exports = {
	'facebookAuth': {
		'clientID':  "3919745328141290", // your App ID
		'clientSecret':  "18305cf046ca40b8c832476c67098e03", // your App Secret
		'callbackURL':  'https://localhost:3000/auth/facebook/callback'
	},


    'googleAuth':{
       'clientID': "24985356847-tn2n4bt492rhusq7qj849rcq7r6jj9gp.apps.googleusercontent.com",
        'clientSecret': "MLYO_Ma0T0ofPy5iTRDsPbf-",
        'callbackURL': "https://localhost:3000/google/callback",
    },

    'twitterAuth':{
        'clientID': "R7YhCmXfjsFCRs628tmf5JUAG",
        'clientSecret': "1xpd5DfBmNg5iQ7e84v7B8fTgC01Spth7XkarvwbiKdV5NwytH",
        'callbackURL': "https://localhost:3000/auth/twitter/callback",
        proxy: true
    },

    'linkedinAuth':{
        'clientID': "86d7v7g6asfqx8",
        'clientSecret': "xrTOZ1WsGLYrA0Wn",
        'callbackURL': "https://localhost:3000/auth/linkedin/callback",
    },
}