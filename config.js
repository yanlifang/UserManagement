module.exports = {
	'facebookAuth': {
		'clientID':  "3919745328141290", // your App ID
		'clientSecret':  "18305cf046ca40b8c832476c67098e03", // your App Secret
		'callbackURL':  'http://localhost:3000/auth/facebook/callback'
	},


    'googleAuth':{
       'clientID': "24985356847-tn2n4bt492rhusq7qj849rcq7r6jj9gp.apps.googleusercontent.com",
        'clientSecret': "MLYO_Ma0T0ofPy5iTRDsPbf-",
        'callbackURL': "http://localhost:3000/google/callback"
    },

    'twitterAuth':{
        'clientID': "9tHPgjsG6TvJRLfaK33SxOM2u",
        'clientSecret': "oGRWsyZMjy0ikSUvrSqfWs4EH3S0gXNgINfspQaB0DqufZvqDP",
        'callbackURL': "http://localhost:3000/auth/twitter/callback",
        proxy: true
    },

    'linkedinAuth':{
        'clientID': "86d7v7g6asfqx8",
        'clientSecret': "xrTOZ1WsGLYrA0Wn",
        'callbackURL': "http://localhost:3000/auth/linkedin/callback",
    }
}