return {
	['parachute'] = {
		label = 'Parachute',
		rarity = 'uncommon',
		weight = 8000,
		stack = false,
		client = {
			anim = { dict = 'clothingshirt', clip = 'try_shirt_positive_d' },
			usetime = 1500
		}
	},
	['money'] = {
		label = 'Money',
	},
	-- ['coin_diamond'] = {
	-- 	label = 'Diamond Coin',
	-- 	rarity = ''
	-- },
	-- ['coin_platinum'] = {
	-- 	label = 'Platinum Coin',
	-- 	rarity = ''
	-- },
	-- ['coin_gold'] = {
	-- 	label = 'Gold Coin',
	-- },
	-- ['coin_silver'] = {
	-- 	label = 'Silver Coin',
	-- },
	['radio'] = {
		label = 'Radio',
		rarity = 'uncommon',
		weight = 1000,
		stack = false,
		allowArmed = true
	},
	['bandage'] = {
		label = 'Bandage',
		rarity = 'common',
		weight = 150,
		stack = true,
		close = true,
		allowArmed = false,
		description = 'Bandage',
		client = {
			image = 'bandage.png'
		}
	},
	['medkit'] = {
		label = 'Medkit',
		rarity = 'epic',
		weight = 150,
		stack = true,
		close = true,
		allowArmed = false,
		description = 'Medkit',
		client = {
			image = 'medkit.png'
		}
	},
	['potion_chlorophyll'] = {
		label = 'Chlorophyll Potion',
		rarity = 'rare',
		weight = 150,
		stack = true,
		close = true,
		allowArmed = false,
		description = 'Chlorophyll Potion',
		client = {
			image = 'potion_chlorophyll.png'
		}
	},
	['potion_mini_shield'] = {
		label = 'Shield Potion',
		rarity = 'uncommon',
		weight = 150,
		stack = true,
		close = true,
		allowArmed = false,
		description = 'Mini Shield Potion',
		client = {
			image = 'potion_mini_shield.png'
		}
	},
	['potion_medium_shield'] = {
		label = 'Shield Potion',
		rarity = 'rare',
		weight = 150,
		stack = true,
		close = true,
		allowArmed = false,
		description = 'Medium Shield Potion',
		client = {
			image = 'potion_medium_shield.png'
		}
	},
	['potion_max_shield'] = {
		label = 'Shield Potion',
		rarity = 'epic',
		weight = 150,
		stack = true,
		close = true,
		allowArmed = false,
		description = 'Max Shield Potion',
		client = {
			image = 'potion_max_shield.png'
		}
	},
}
