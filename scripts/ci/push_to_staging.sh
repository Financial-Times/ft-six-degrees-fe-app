echo "Pushing to staging..."

git checkout staging
git merge develop
git push origin staging