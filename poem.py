# Writing poems
# Word lists are organized
# By number of syllables

import random
import time

nouns = [
		'air', 'breath', 'cat', 'ear', 'ray', 'kiss'
		'cheek', 'dawn', 'dusk', 'night', 'day', 'sun',
		'moon', 'love', 'hurt', 'heart', 'sleep','wake',
		'life', 'death', 'birth', 'mind', 'eye', 'sky',
		'cloud', 'rain', 'dark', 'light', 'joy', 'peace',
		'child', 'water', 'romance', 'darkness', 'sunlight', 'nighttime',
		'lover', 'boyfriend', 'girlfriend', 'sadness', 'moonlight', 'sunlight',
		'rainfall', 'sunset', 'sunrise', 'child', 'summer','winter',
		'springtime', 'flower', 'poem', 'singsong', 'madness', 'heartbreak',
		'madness', 'shower', 'high school', 'grade school', 'teacher', 'beauty'
]

verbs = [
		'laughs', 'weeps', 'cries', 'sobs', 'loves',
		'sleeps', 'wakes', 'wishes', 'hears', 'craves',
		'wails', 'mourns', 'dies', 'lives', 'sees'
]

adjectives = [
		'red', 'blue', 'pink', 'white', 'black',
		'green', 'brown', 'smart', 'young', 'old',
		'dead', 'lost', 'loved', 'sick', 'gone',
		'wishful', 'mourning', 'grieving', 'dying', 'buried',
		'cherished', 'treasured', 'loving', 'caring', 'laughing',
		'sleeping', 'leaving', 'crying', 'lasting', 'finite'
	]

pronouns = {
	
	'personal': {
		'nom':['I', 'you', 'he', 'she', 'it', 'we', 'they'],
		'acc':['me', 'you', 'him', 'her', 'it', 'us', 'them']
	},

	'possessive': {
		'det':['my', 'your', 'his', 'her', 'its', 'our', 'their'],
		'np':['mine', 'yours', 'his', 'hers', 'its', 'ours', 'theirs']
	}
}

preps = [
	'to', 'from', 'at', 'in', 'over', 'under', 'out of', 'on top of', 'behind'
]

determiners = [
	'a', 'the'
]

# Random from l
def r(l):
	return random.choice(l)

# Phrase from word args
def phrase(words):
	output = ''

	for pos in range(0, len(words) - 1):
		output += words[pos]
		output += ' '

	return output + words[-1]

def pp():
	return r([
	phrase([r(preps), r(adjectives), r(nouns)]),
	phrase([r(preps), r(nouns)])
	])

def np():
	return r([
		phrase([r(determiners), r(adjectives), r(nouns), pp()]),
		phrase([r(pronouns['possessive']['det']), r(adjectives), r(nouns)])
		])

def vp():
	return r([
		phrase([r(verbs), np(), pp()]),
		phrase([r(verbs), pp()]),
		phrase([r(verbs), np()])
		])

def print_poem():
	print(f"{np()} {vp()}\n{vp()}\n{np()} {vp()}\n{pp()}\n{np()}")

while True:
	print_poem()
	time.sleep(5)
	print('\n\n\n')
