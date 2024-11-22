use anchor_lang::prelude::*;

declare_id!("CWzS9kJ8d4LAtdj2jgfWXeVSgz3ouGXdZRnv4TDq1ynV");

pub const ANCHOR_DISCRIMINATOR_SIZE: usize = 8;

#[program]
pub mod favorites {
    use super::*;

    pub fn set_fevorites(
        ctx: Context<SetFavorites>,
        num: u64,
        color: String,
        hobbies: Vec<String>,
    ) -> Result<()> {
        // let _user_public_key = ctx.accounts.user.key();

        // msg!("User {user_public_key}");

        ctx.accounts.favorite.set_inner(Favorites {
            number: num,
            color,
            hobbies,
        });

        // ctx.accounts.favorite.number = 100;
        Ok(())
    }
}

#[account]
#[derive(InitSpace)]
pub struct Favorites {
    pub number: u64,

    #[max_len(50)]
    pub color: String,

    #[max_len(5, 50)]
    pub hobbies: Vec<String>,
}

#[derive(Accounts)]
pub struct SetFavorites<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init,
        payer = user,
        space= ANCHOR_DISCRIMINATOR_SIZE + Favorites::INIT_SPACE,
        seeds = [b"favorite",user.key().as_ref()],
        bump
         )]
    pub favorite: Account<'info, Favorites>,

    pub system_program: Program<'info, System>,
}
