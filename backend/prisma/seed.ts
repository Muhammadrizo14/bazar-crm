import user from "./seeders/user.seed";
import role from "./seeders/role.seed";
import permission from "./seeders/permission.seed";
import organization from "./seeders/organization.seed";

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const seedData = [
    organization,
    permission,
    role,
    user,
]

async function main() {
    for (let i = 0; i < seedData.length; i++) {
        for (let j = 0; j < seedData[i]['data'].length; j++) {
            if (!['organization', 'permission', 'role', 'user'].includes(seedData[i]['tag'])) {
                seedData[i]['data'][j]['organization_id'] = 1
            }
            await prisma[seedData[i]['tag']].create({
                data: seedData[i]['data'][j]
            })
        }
        console.log(seedData[i]['tag'])
    }
}

main().catch(e => {
    console.log(e)
    process.exit(1)
}).finally(() => {
    console.log("\ndone")
    prisma.$disconnect()
})